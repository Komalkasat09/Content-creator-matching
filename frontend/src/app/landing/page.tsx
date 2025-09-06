"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Target, TrendingUp, Star, CheckCircle, Play, Menu, X, Zap, Shield, BarChart3, Globe, Sparkles, MousePointer } from 'lucide-react';
import { ModeToggle } from '@/components/toggle';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Matching",
      description: "Connect with verified creators in seconds using our advanced matching algorithm",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Dashboard",
      description: "Track performance with real-time insights and comprehensive reporting tools",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Payments",
      description: "End-to-end encrypted transactions with automatic escrow protection",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Reach",
      description: "Access creators worldwide with multi-language and currency support",
      gradient: "from-violet-500 to-purple-600"
    }
  ];

  const stats = [
    { number: "12K", label: "Verified Creators", suffix: "+" },
    { number: "750", label: "Brand Partners", suffix: "+" },
    { number: "98", label: "Success Rate", suffix: "%" },
    { number: "3.2", label: "Average ROI", suffix: "x" }
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Head of Marketing",
      company: "Zenith Corp",
      content: "The platform transformed how we approach influencer marketing. Results exceeded expectations by 340%.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Maya Patel", 
      role: "Creative Director",
      company: "Bloom Studios",
      content: "Incredible precision in matching. Found our perfect brand ambassadors within hours, not weeks.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Jordan Kim",
      role: "Brand Strategy Lead",
      company: "Nova Dynamics", 
      content: "The analytics depth is unmatched. We now understand our audience better than ever before.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 relative overflow-hidden">
      {/* Cursor follower */}
      <div 
        className="fixed w-8 h-8 bg-blue-500/20 rounded-full pointer-events-none z-50 transition-all duration-300 mix-blend-multiply dark:mix-blend-screen"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />

      {/* Floating elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60" />
        <div className="absolute top-40 right-[15%] w-3 h-3 bg-purple-400 rounded-full animate-float animation-delay-1000 opacity-40" />
        <div className="absolute bottom-40 left-[20%] w-2 h-2 bg-emerald-400 rounded-full animate-float animation-delay-2000 opacity-50" />
        <div className="absolute bottom-60 right-[25%] w-1 h-1 bg-amber-400 rounded-full animate-float animation-delay-1500 opacity-70" />
      </div> */}

      {/* Navigation */}
      <nav className="relative z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center group">
              <div className="relative">
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-blue-500 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-glow">
                  BrandConnect
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="relative group text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/50 dark:hover:bg-slate-800/50">
                <span className="relative z-10">Features</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </Link>
              <Link href="#testimonials" className="relative group text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/50 dark:hover:bg-slate-800/50">
                <span className="relative z-10">Success Stories</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </Link>
              <ModeToggle />
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/auth">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu */}
            <div className="md:hidden flex items-center space-x-4">
              <ModeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-110"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 mt-2">
                <Link href="#features" className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all">
                  Features
                </Link>
                <Link href="#testimonials" className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all">
                  Success Stories
                </Link>
                <div className="pt-2">
                  {isAuthenticated ? (
                    <Link href="/dashboard">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl">
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/auth">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl">
                        Get Started
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background gradients */}
        {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full filter blur-3xl animate-float" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full filter blur-3xl animate-float animation-delay-2000" />
         */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 mb-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-full border border-white/20 dark:border-slate-700/20 animate-slide-in-up">
              <MousePointer className="w-4 h-4 mr-2 text-blue-500 animate-bounce-subtle" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">AI-Powered Creator Matching</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight animate-slide-in-up animation-delay-300">
              Connect with
              <br />
                Perfect Creators
              
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-in-up animation-delay-600">
              Discover, connect, and collaborate with content creators that align perfectly with your brand values and audience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-in-up animation-delay-900">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <span className="mr-3">Open Dashboard</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth">
                    <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                      <span className="mr-3">Start Matching</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="group border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 text-lg rounded-2xl backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
                    <Play className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                    <span>Watch Demo</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-slide-in-up animation-delay-1200">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center">
                <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 transition-all duration-500 hover:scale-105 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                      {stat.number}{stat.suffix}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-blue-50/50 dark:from-slate-900/50 dark:to-slate-800/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-in-up">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-full border border-white/20 dark:border-slate-700/20">
              <Zap className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Platform Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Powerful tools and insights to help you find, connect, and manage creator partnerships seamlessly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group animate-slide-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative h-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-slate-700/20 transition-all duration-500 hover:scale-105 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="mb-6">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white transition-transform duration-300 group-hover:scale-110`}>
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full filter blur-3xl animate-float animation-delay-2000" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-in-up">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-full border border-white/20 dark:border-slate-700/20">
              <Star className="w-4 h-4 mr-2 text-amber-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Trusted by industry leaders
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              See how brands like yours are achieving exceptional results with our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group animate-slide-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative h-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-slate-700/20 transition-all duration-500 hover:scale-105 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full ring-2 ring-white/50 dark:ring-slate-700/50 mr-4 transition-transform duration-300 group-hover:scale-110"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 animate-glow" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-float" />
          <div className="absolute top-8 right-8 w-3 h-3 bg-white rounded-full animate-float animation-delay-500" />
          <div className="absolute bottom-8 left-8 w-2 h-2 bg-white rounded-full animate-float animation-delay-1000" />
          <div className="absolute bottom-4 right-4 w-1 h-1 bg-white rounded-full animate-float animation-delay-1500" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-slide-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to scale your influence?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of brands already creating meaningful partnerships through our platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button size="lg" className="group bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <span className="mr-3">Go to Dashboard</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth">
                    <Button size="lg" className="group bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                      <span className="mr-3">Start Free Today</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="group border-2 border-white/30 text-white px-8 py-4 text-lg rounded-2xl backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300">
                    <Play className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                    <span>See Demo</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-900 dark:bg-slate-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <Sparkles className="w-6 h-6 mr-2 text-blue-400" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  BrandConnect
                </h3>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                The future of creator partnerships starts here. Connect, collaborate, and create impact.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Target className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-white">Platform</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Docs</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Press Kit</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 mb-4 md:mb-0">
              © 2024 BrandConnect. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-slate-400">
              <span className="text-sm">Made with</span>
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm">for creators</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
