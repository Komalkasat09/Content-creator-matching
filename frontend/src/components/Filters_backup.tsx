import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { FilterValues } from './MatchConsole';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Sparkles, Filter, RotateCcw } from 'lucide-react';

type FiltersProps = {
    filters: FilterValues;
    setFilters: (filters: FilterValues) => void;
    onNewSearch: () => void;
}

const platformOptions = [
    { id: "Instagram", label: "Instagram", icon: "📷" },
    { id: "YouTube", label: "YouTube", icon: "📺" },
    { id: "LinkedIn", label: "LinkedIn", icon: "💼" },
    { id: "Reels", label: "Reels", icon: "🎬" }
];

const toneOptions = [
    { id: "energetic", label: "Energetic", color: "bg-orange-500" },
    { id: "fun", label: "Fun", color: "bg-pink-500" },
    { id: "informative", label: "Informative", color: "bg-blue-500" },
    { id: "serious", label: "Serious", color: "bg-slate-500" },
    { id: "casual", label: "Casual", color: "bg-green-500" }
];

export default function Filters({ filters, setFilters, onNewSearch }: FiltersProps) {
    const handlePlatformChange = (platform: string, checked: boolean) => {
        setFilters({
            ...filters,
            platforms: checked
                ? [...filters.platforms, platform]
                : filters.platforms.filter(p => p !== platform)
        });
    };

    const handleToneChange = (tone: string, checked: boolean) => {
        setFilters({
            ...filters,
            contentTone: checked
                ? [...filters.contentTone, tone]
                : filters.contentTone.filter(t => t !== tone)
        });
    };

    const resetFilters = () => {
        setFilters({
            budget: [0, 200000],
            platforms: [],
            contentTone: [],
            minEngagement: 0
        });
    };
    
    return (
        <div className="sticky top-24">
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                <Filter className="h-4 w-4" />
                            </div>
                            <CardTitle className="text-slate-900 dark:text-white">Smart Filters</CardTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                
                <CardContent className="space-y-8">
                    {/* Budget Range */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                            <Label className="font-medium text-slate-700 dark:text-slate-300">Budget Range</Label>
                        </div>
                        <div className="px-3">
                            <Slider
                                min={0} 
                                max={200000} 
                                step={10000}
                                value={filters.budget}
                                onValueChange={(value) => setFilters({...filters, budget: value})}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mt-3">
                                <span className="font-medium">₹{filters.budget[0].toLocaleString()}</span>
                                <span className="font-medium">₹{filters.budget[1].toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Platforms */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                            <Label className="font-medium text-slate-700 dark:text-slate-300">Platforms</Label>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {platformOptions.map(platform => (
                                <div key={platform.id} className="group">
                                    <label className="relative flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-white/20 dark:border-slate-600/20 cursor-pointer transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-700/70 hover:scale-105">
                                        <Checkbox
                                            checked={filters.platforms.includes(platform.id)}
                                            onCheckedChange={(checked) => 
                                                handlePlatformChange(platform.id, checked as boolean)
                                            }
                                            className="border-slate-300 dark:border-slate-600"
                                        />
                                        <div className="flex items-center space-x-2 flex-1">
                                            <span className="text-lg">{platform.icon}</span>
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {platform.label}
                                            </span>
                                        </div>
                                        {filters.platforms.includes(platform.id) && (
                                            <div className="absolute -top-1 -right-1">
                                                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {filters.platforms.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {filters.platforms.map(platform => (
                                    <Badge key={platform} variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                        {platform}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content Tone */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                            <Label className="font-medium text-slate-700 dark:text-slate-300">Content Tone</Label>
                        </div>
                        <div className="space-y-2">
                            {toneOptions.map(tone => (
                                <label key={tone.id} className="group relative flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-white/20 dark:border-slate-600/20 cursor-pointer transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-700/70">
                                    <Checkbox
                                        checked={filters.contentTone.includes(tone.id)}
                                        onCheckedChange={(checked) => 
                                            handleToneChange(tone.id, checked as boolean)
                                        }
                                        className="border-slate-300 dark:border-slate-600"
                                    />
                                    <div className="flex items-center space-x-3 flex-1">
                                        <div className={`w-3 h-3 rounded-full ${tone.color}`}></div>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                                            {tone.label}
                                        </span>
                                    </div>
                                    {filters.contentTone.includes(tone.id) && (
                                        <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
                                    )}
                                </label>
                            ))}
                        </div>
                        {filters.contentTone.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {filters.contentTone.map(tone => {
                                    const toneObj = toneOptions.find(t => t.id === tone);
                                    return (
                                        <Badge key={tone} variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                            <div className={`w-2 h-2 rounded-full ${toneObj?.color} mr-1`}></div>
                                            {toneObj?.label}
                                        </Badge>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Engagement Rate */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                            <Label className="font-medium text-slate-700 dark:text-slate-300">Min. Engagement Rate</Label>
                        </div>
                        <Select value={filters.minEngagement.toString()} onValueChange={(value) => setFilters({...filters, minEngagement: parseFloat(value)})}>
                            <SelectTrigger className="w-full bg-white/50 dark:bg-slate-700/50 border border-white/20 dark:border-slate-600/20 rounded-xl">
                                <SelectValue placeholder="Select minimum engagement" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-xl">
                                <SelectItem value="0" className="rounded-lg">Any engagement rate</SelectItem>
                                <SelectItem value="1" className="rounded-lg">1%+ engagement</SelectItem>
                                <SelectItem value="2" className="rounded-lg">2%+ engagement</SelectItem>
                                <SelectItem value="3" className="rounded-lg">3%+ engagement</SelectItem>
                                <SelectItem value="5" className="rounded-lg">5%+ engagement</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* New Search Button */}
                    <div className="pt-4 border-t border-white/20 dark:border-slate-700/20">
                        <Button 
                            onClick={onNewSearch} 
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Start New Search
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
                            <div key={p} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={p} 
                                    onCheckedChange={(checked) => handlePlatformChange(p, !!checked)}
                                    checked={filters.platforms.includes(p)}
                                />
                                <label htmlFor={p} className="text-sm font-medium">{p}</label>
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <Label>Tone</Label>
                     <Select onValueChange={(value) => setFilters({...filters, tone: value === 'all' ? null : value})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Any Tone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Any Tone</SelectItem>
                            {toneOptions.map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <Button variant="outline" className="w-full" onClick={onNewSearch}>Start New Search</Button>
            </CardContent>
        </Card>
    )
}