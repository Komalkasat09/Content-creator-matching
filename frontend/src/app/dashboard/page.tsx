"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import BrandBriefForm from '@/components/BrandBriefForm';
import MatchConsole from '@/components/MatchConsole';
import BillingFlow from '@/components/BillingFlow';
import { Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

export type CreatorMatch = {
  creator: {
    _id: string; handle: string; verticals: string[]; platforms: string[];
    avgViews: number; engagementRate: number; basePriceINR: number;
    contentTone: string[];
  };
  score: number; reasons: string[];
};

export default function DashboardPage() {
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();
  const [matches, setMatches] = useState<CreatorMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'form' | 'matches' | 'billing'>('form');

  const handleMatch = async (brief: any) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/match', brief);
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/auth');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setMatches(data);
      setView('matches');
    } catch (error) {
      console.error('Error fetching matches:', error);
      alert('Failed to fetch matches. Please make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetView = () => {
    setView('form');
    setMatches([]);
  };

  // Quick stats for the dashboard
  const dashboardStats = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Active Campaigns",
      value: "3",
      change: "+12%",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Total Reach",
      value: "2.4M",
      change: "+35%",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Engagement Rate",
      value: "4.8%",
      change: "+8%",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Creator Matches",
      value: matches.length.toString(),
      change: "New",
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[15%] w-64 h-64 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full filter blur-3xl animate-float" />
          <div className="absolute top-40 right-[10%] w-80 h-80 bg-gradient-to-br from-purple-400/15 to-transparent rounded-full filter blur-3xl animate-float animation-delay-2000" />
          <div className="absolute bottom-20 left-[25%] w-72 h-72 bg-gradient-to-br from-emerald-400/15 to-transparent rounded-full filter blur-3xl animate-float animation-delay-4000" />
        </div>
        
        <Header />
        
        <main className="container mx-auto p-6 lg:p-8 relative z-10 max-w-7xl">
          {/* Dashboard Stats - Only show when not in billing view */}
          {view !== 'billing' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-in-up">
              {dashboardStats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 transition-all duration-500 hover:scale-105 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white transition-transform duration-300 group-hover:scale-110`}>
                          {stat.icon}
                        </div>
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {stat.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Main Content Area */}
          <div className="animate-slide-in-up animation-delay-300">
            {view === 'form' && (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20">
                  <BrandBriefForm onMatch={handleMatch} isLoading={isLoading} />
                </div>
              </div>
            )}
            
            {view === 'matches' && (
              <div className="animate-slide-in-right">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20">
                    <MatchConsole
                      matches={matches}
                      onNewSearch={resetView}
                      onProceedToBilling={() => setView('billing')}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {view === 'billing' && (
              <div className="animate-slide-in-left">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20">
                    <BillingFlow onBack={resetView} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
