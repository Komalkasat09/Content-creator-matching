import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
export type CreatorMatch = {
  creator: {
    handle: string;
    verticals: string[];
    platforms: string[];
    avgViews: number;
    engagementRate: number;
    basePriceINR: number;
  };
  score: number;
  reasons: string[];
};
import { motion } from 'framer-motion';
import { BarChart2, Eye, Users, DollarSign } from 'lucide-react';

type CreatorCardProps = {
  match: CreatorMatch;
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function CreatorCard({ match }: CreatorCardProps) {
    const { creator, score, reasons } = match;
    const erPercentage = (creator.engagementRate * 100).toFixed(1);

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{creator.handle}</CardTitle>
                <CardDescription>{creator.verticals.join(' • ')}</CardDescription>
                 <div className="flex gap-2 flex-wrap mt-2">
                    {creator.platforms.map(p => <Badge key={p} variant="secondary">{p}</Badge>)}
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <p className="font-bold text-2xl text-blue-600">{score}</p>
                <p className="text-sm text-muted-foreground">Match Score</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={score} className="w-full" />
            <div className="flex gap-2 flex-wrap">
              {reasons.map(reason => <Badge key={reason}>{reason}</Badge>)}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm pt-4 border-t">
                <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-muted-foreground" /><p>{creator.avgViews.toLocaleString()} <span className="text-muted-foreground text-xs">Avg Views</span></p></div>
                <div className="flex items-center gap-2"><BarChart2 className="h-4 w-4 text-muted-foreground" /><p>{erPercentage}% <span className="text-muted-foreground text-xs">ER</span></p></div>
                <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-muted-foreground" /><p>₹{creator.basePriceINR.toLocaleString()} <span className="text-muted-foreground text-xs">Base</span></p></div>
            </div>
          </CardContent>
        </Card>
    </motion.div>
  );
}