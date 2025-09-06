"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Printer } from 'lucide-react';

const brandBillingSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format"),
});

const creatorPayoutSchema = z.object({
    pan: z.string().regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN format"),
    ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC format"),
    upi: z.string().regex(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, "Invalid UPI format"),
});

export default function BillingFlow({ onBack }: { onBack: () => void }) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [budget, setBudget] = useState(500000); // Sample budget
  const gst = budget * 0.18;
  const total = budget + gst;

  // Sample billing data
  const sampleBilling = {
    campaignName: "Summer Fashion Collection 2024",
    selectedCreators: [
      { name: "@fashionista_maya", followers: "250K", rate: "₹85,000" },
      { name: "@lifestyle_arjun", followers: "180K", rate: "₹65,000" },
      { name: "@trendy_priya", followers: "320K", rate: "₹120,000" }
    ],
    timeline: "4 weeks",
    deliverables: "3 Instagram posts + 5 stories per creator"
  };

  const brandForm = useForm<z.infer<typeof brandBillingSchema>>({ 
    resolver: zodResolver(brandBillingSchema),
    defaultValues: {
      company: "Trendy Threads Pvt Ltd",
      gstin: "29ABCDE1234F1Z5"
    }
  });
  
  const creatorForm = useForm<z.infer<typeof creatorPayoutSchema>>({ 
    resolver: zodResolver(creatorPayoutSchema),
    defaultValues: {
      pan: "ABCDE1234F",
      ifsc: "HDFC0001234",
      upi: "creator@paytm"
    }
  });

  const handleValidate = async (values: any, endpoint: string, formType: 'Brand' | 'Creator') => {
    setIsLoading(true);
    try {
        const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Validation failed');
        toast.success('Validation Success', { description: `${formType} details are valid.` });
    } catch (error: any) {
        toast.error('Validation Error', { description: error.message });
    } finally {
        setIsLoading(false);
    }
  };

  const handleSavePdf = () => {
    toast.info("Printing Invoice...", { description: "Your browser's print dialog will open." });
    setTimeout(() => window.print(), 500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
        {/* Header */}
        <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Campaign Billing & Payout
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Finalize your campaign details and manage payments for your selected creators.
            </p>
        </div>

        {/* Campaign Overview Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-800/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-900 dark:text-blue-100">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Printer className="w-4 h-4 text-white" />
              </div>
              <span>{sampleBilling.campaignName}</span>
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              Campaign details and creator selection summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Selected Creators</h4>
                  <div className="space-y-2">
                    {sampleBilling.selectedCreators.map((creator, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg border border-white/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {creator.name.charAt(1).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{creator.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{creator.followers} followers</p>
                          </div>
                        </div>
                        <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {creator.rate}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Campaign Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Timeline:</span>
                      <span className="font-medium">{sampleBilling.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Deliverables:</span>
                      <span className="font-medium text-right">{sampleBilling.deliverables}</span>
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Subtotal:</span>
                        <span className="font-medium">₹{budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">GST (18%):</span>
                        <span className="font-medium">₹{gst.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total Amount:</span>
                        <span className="text-blue-600 dark:text-blue-400">₹{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Tabs */}
        <Tabs defaultValue="brand" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-xl p-1">
            <TabsTrigger value="brand" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              Step 1: Brand Billing
            </TabsTrigger>
            <TabsTrigger value="payout" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              Step 2: Creator Payout
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="brand">
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-900 dark:text-white">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white">
                      <span className="text-sm font-bold">₹</span>
                    </div>
                    <span>Brand Billing Details</span>
                  </CardTitle>
                  <CardDescription>
                    Enter your company details for invoice generation and tax compliance
                  </CardDescription>
                </CardHeader>
                <Form {...brandForm}>
                    <form onSubmit={brandForm.handleSubmit((values) => handleValidate(values, '/api/billing/validate', 'Brand'))}>
                        <CardContent className="space-y-6">
                            <FormField control={brandForm.control} name="company" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Company Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter your company name" 
                                      {...field} 
                                      className="bg-white/50 dark:bg-slate-700/50 border border-white/20 dark:border-slate-600/20 rounded-xl"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={brandForm.control} name="gstin" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">GSTIN</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="29ABCDE1234F1Z5" 
                                      {...field} 
                                      className="bg-white/50 dark:bg-slate-700/50 border border-white/20 dark:border-slate-600/20 rounded-xl"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )} />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={onBack}
                              className="border-slate-300 dark:border-slate-600 rounded-xl"
                            >
                              Back to Matches
                            </Button>
                            <Button 
                              type="submit" 
                              disabled={isLoading}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
                            >
                              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                              Validate & Continue
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
          </TabsContent>

          <TabsContent value="payout">
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-900 dark:text-white">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                      <span className="text-sm font-bold">₹</span>
                    </div>
                    <span>Creator Payout Details</span>
                  </CardTitle>
                  <CardDescription>
                    Configure payment details for selected creators
                  </CardDescription>
                </CardHeader>
                <Form {...creatorForm}>
                    <form onSubmit={creatorForm.handleSubmit((values) => handleValidate(values, '/api/payout/validate', 'Creator'))}>
                        <CardContent className="space-y-6">
                             <FormField control={creatorForm.control} name="pan" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">PAN Number</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="ABCDE1234F" 
                                      {...field} 
                                      className="bg-white/50 dark:bg-slate-700/50 border border-white/20 dark:border-slate-600/20 rounded-xl"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={creatorForm.control} name="ifsc" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">IFSC Code</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="HDFC0001234" 
                                      {...field} 
                                      className="bg-white/50 dark:bg-slate-700/50 border border-white/20 dark:border-slate-600/20 rounded-xl"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={creatorForm.control} name="upi" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">UPI ID</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="creator@paytm" 
                                      {...field} 
                                      className="bg-white/50 dark:bg-slate-700/50 border border-white/20 dark:border-slate-600/20 rounded-xl"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                            )} />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={onBack}
                              className="border-slate-300 dark:border-slate-600 rounded-xl"
                            >
                              Back to Matches
                            </Button>
                            <div className="flex space-x-3">
                              <Button 
                                type="submit" 
                                disabled={isLoading}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl"
                              >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Validate Payout
                              </Button>
                              <Button 
                                type="button" 
                                onClick={handleSavePdf}
                                className="bg-black from-black-600 to-black-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
                              >
                                <Printer className="mr-2 h-4 w-4" />
                                Generate Invoice
                              </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
          </TabsContent>
        </Tabs>
    </div>
  );
}