"use client";

import { Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Zap, Target, Sparkles } from "lucide-react";

const formSchema = z.object({
  category: z.string().min(1, "Category is required"),
  budget: z.coerce.number().min(50000, "Budget must be at least ₹50,000"),
  locations: z.string().min(2, "At least one location is required"),
  ageRange: z.string().min(1, "Please select an age range"),
  tone: z.string().min(2, "At least one tone is required"),
  platforms: z.string().min(2, "At least one platform is required"),
});

type BrandBriefFormProps = {
  onMatch: (data: any) => void;
  isLoading: boolean;
};

const prefilledTemplates = {
  b1: {
    category: 'Fashion', budget: 500000, locations: 'Mumbai, Delhi',
    ageRange: '18-30', tone: 'energetic, fun', platforms: 'Instagram, YouTube'
  },
  b2: {
    category: 'Fintech', budget: 300000, locations: 'Bengaluru, Hyderabad',
    ageRange: '22-35', tone: 'informative, serious', platforms: 'YouTube, LinkedIn'
  }
};

export default function BrandBriefForm({ onMatch, isLoading }: BrandBriefFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as Resolver<z.infer<typeof formSchema>>,
    defaultValues: {
      category: "", budget: 100000, locations: "", ageRange: "18-30", tone: "", platforms: ""
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formattedData = {
      ...values,
      locations: values.locations.split(',').map(s => s.trim()),
      tone: values.tone.split(',').map(s => s.trim().toLowerCase()),
      platforms: values.platforms.split(',').map(s => s.trim()),
    };
    onMatch(formattedData);
  };

  const loadTemplate = (templateId: 'b1' | 'b2') => {
      form.reset(prefilledTemplates[templateId]);
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8 animate-slide-in-up">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full animate-float">
            <Target className="h-8 w-8 text-blue-600 animate-bounce-subtle" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Create Your Brand Brief</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Tell us about your campaign goals and we'll find the perfect creators for your brand.
        </p>
        
        {/* Quick Templates */}
        <div className="flex flex-wrap gap-2 justify-center mb-8 animate-slide-in-up animation-delay-500">
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 hover-lift animate-slide-in-left"
            onClick={() => loadTemplate('b1')}
          >
            <Zap className="w-3 h-3 mr-1 animate-bounce-subtle" />
            Fashion Campaign
          </Badge>
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-green-100 dark:hover:bg-green-900 transition-all duration-300 hover-lift animate-slide-in-right" 
            onClick={() => loadTemplate('b2')}
          >
            <Sparkles className="w-3 h-3 mr-1 animate-bounce-subtle animation-delay-500" />
            FinTech Launch
          </Badge>
        </div>
      </div>

      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border-0 card-3d hover-lift animate-slide-in-up animation-delay-1000">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-t-lg">
          <CardTitle className="text-xl flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600 animate-float" />
            Campaign Details
          </CardTitle>
          <CardDescription>
            Provide information about your brand and target audience for optimal creator matching.
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid md:grid-cols-2 gap-6 p-8">
                 <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem className="animate-slide-in-left animation-delay-500">
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-medium">Brand Category</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Fashion, Fintech" 
                            {...field} 
                            className="bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover-glow"
                          />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                 <FormField control={form.control} name="budget" render={({ field }) => (
                    <FormItem className="animate-slide-in-right animation-delay-500">
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-medium">Budget (₹)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g., 500000" 
                            {...field} 
                            className="bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover-glow"
                          />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                 <FormField control={form.control} name="locations" render={({ field }) => (
                    <FormItem className="animate-slide-in-left animation-delay-1000">
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-medium">Target Locations (comma-separated)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Mumbai, Delhi" 
                            {...field} 
                            className="bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover-glow"
                          />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="ageRange" render={({ field }) => (
                    <FormItem className="animate-slide-in-right animation-delay-1000">
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-medium">Target Age Range</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover-glow transition-all duration-300">
                                <SelectValue placeholder="Select an age range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                                <SelectItem value="18-24" className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">18-24</SelectItem>
                                <SelectItem value="18-30" className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">18-30</SelectItem>
                                <SelectItem value="22-35" className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">22-35</SelectItem>
                                <SelectItem value="25-40" className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">25-40</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />

                 <FormField control={form.control} name="tone" render={({ field }) => (
                    <FormItem className="animate-slide-in-left animation-delay-1500">
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-medium">Desired Tone (comma-separated)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., energetic, fun, informative" 
                            {...field} 
                            className="bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover-glow"
                          />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                 <FormField control={form.control} name="platforms" render={({ field }) => (
                    <FormItem className="animate-slide-in-right animation-delay-1500">
                        <FormLabel className="text-gray-800 dark:text-gray-200 font-medium">Target Platforms (comma-separated)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Instagram, YouTube" 
                            {...field} 
                            className="bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover-glow"
                          />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </CardContent>
            <CardFooter className="animate-slide-in-up animation-delay-2000">
                 <Button type="submit" disabled={isLoading} size="lg" className="w-full hover-lift animate-pulse-glow">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4 animate-bounce-subtle" />}
                    {isLoading ? "Finding Matches..." : "Find Creators"}
                </Button>
            </CardFooter>
        </form>
       </Form>
    </Card>
    </div>
  );
}