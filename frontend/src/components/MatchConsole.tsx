import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
export type CreatorMatch = {
  creator: {
    _id: string;
    handle: string;
    verticals: string[];
    platforms: string[];
    avgViews: number;
    engagementRate: number;
    basePriceINR: number;
    contentTone: string[];
  };
  score: number;
  reasons: string[];
};
import CreatorCard from './CreatorCard';
import Filters from './Filters';

type MatchConsoleProps = {
  matches: CreatorMatch[];
  onNewSearch: () => void;
  onProceedToBilling: () => void;
};

export type FilterValues = {
    platforms: string[];
    budget: number[];
    tone: string | null;
    contentTone: string[];
    minEngagement: number;
}

export default function MatchConsole({ matches, onNewSearch, onProceedToBilling }: MatchConsoleProps) {
  const [filters, setFilters] = useState<FilterValues>({
    platforms: [],
    budget: [0, 200000],
    tone: null,
    contentTone: [],
    minEngagement: 0
  });

  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
        const { creator } = match;
        // Budget filter
        if (creator.basePriceINR < filters.budget[0] || creator.basePriceINR > filters.budget[1]) {
            return false;
        }
        // Platform filter
        if (filters.platforms.length > 0 && !filters.platforms.every(p => creator.platforms.includes(p))) {
            return false;
        }
        // Tone filter
        if (filters.tone && !creator.contentTone.includes(filters.tone)) {
            return false;
        }
        return true;
    });
  }, [matches, filters]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <Filters filters={filters} setFilters={setFilters} onNewSearch={onNewSearch} />
      </div>

      <div className="lg:col-span-3 space-y-6">
         <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Top Matches ({filteredMatches.length})</h2>
            <Button size="lg" onClick={onProceedToBilling} disabled={filteredMatches.length === 0}>
                Proceed to Billing
            </Button>
         </div>
        
  {filteredMatches.length > 0 ? (
    filteredMatches.map((match, index) => 
      <CreatorCard key={index} match={match} />
    )
  ) : (
    <div className="text-center py-12">
        <p className="text-lg font-semibold">No matches for the current filters.</p>
        <p className="text-muted-foreground">Try adjusting your search criteria.</p>
    </div>
  )}
      </div>
    </div>
  );
}