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
    { number: "12K+", label: "Verified Creators", suffix: "" },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-black-200 dark:from-slate-900 dark:via-slate-700 dark:to-black-500">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-black-200 dark:border-black-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BrandConnect
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  How it Works
                </Link>
                <Link href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Testimonials
                </Link>
                <ModeToggle />
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ModeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">

              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700">
                <Link href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">
                  How it Works
                </Link>
                <Link href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">
                  Testimonials
                </Link>
                {isAuthenticated ? (
                  <Link href="/dashboard" className="block px-3 py-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth" className="block px-3 py-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-40 pt-20 pb-32 flex items-center min-h-screen overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-1 w-50 h-50 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-in-up">
              Connect Brands with
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text  text-transparent animate-glow"> Perfect Creators</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-in-up animation-delay-500">
              AI-powered matching platform that connects brands with the most relevant content creators based on audience demographics, engagement rates, and content alignment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up animation-delay-1000">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg hover-lift animate-pulse-glow">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5 animate-bounce-subtle" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg hover-lift animate-pulse-glow">
                      Start Matching
                      <ArrowRight className="ml-2 h-5 w-5 animate-bounce-subtle" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 text-lg hover-glow">
                    <Play className="mr-2 h-2 w-5 animate-float" />
                    Watch Demo
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/80 dark:bg-slate-700/80 rounded-xl p-6 card-3d hover-lift glass transition-all duration-300 animate-slide-in-up" 
                     style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 animate-bounce-subtle" 
                       style={{ animationDelay: `${index * 300 + 1000}ms` }}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Perfect Matches
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI-driven platform provides everything you need to find, connect, and collaborate with the right creators for your brand.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm card-3d hover-lift h-full transition-all duration-500 animate-slide-in-up" 
                      style={{ animationDelay: `${index * 150}ms` }}>
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 animate-float group-hover:animate-bounce-subtle transition-all duration-300" 
                           style={{ animationDelay: `${index * 200 + 500}ms` }}>
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-4 h-4 bg-blue-500 rounded-full animate-float"></div>
          <div className="absolute top-40 right-32 w-6 h-6 bg-purple-500 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute bottom-32 left-40 w-5 h-5 bg-green-500 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-3 h-3 bg-pink-500 rounded-full animate-float animation-delay-1500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Leading Brands
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our customers say about their experience with BrandConnect
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-flip h-64 animate-slide-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="card-flip-inner">
                  {/* Front of card */}
                  <Card className="card-flip-front border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm h-full">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4 animate-bounce-subtle"
                          style={{ animationDelay: `${index * 300 + 1000}ms` }}
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                        "{testimonial.content}"
                      </p>
                      <div className="flex mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current animate-bounce-subtle" 
                                style={{ animationDelay: `${i * 100 + index * 200 + 1500}ms` }} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Back of card */}
                  <Card className="card-flip-back border-0 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white h-full">
                    <CardContent className="p-6 flex flex-col justify-center items-center h-full text-center">
                      <CheckCircle className="w-12 h-12 mb-4 animate-pulse-glow" />
                      <h3 className="text-xl font-bold mb-2">Verified Review</h3>
                      <p className="text-blue-100">
                        This testimonial has been verified and represents a real customer experience with our platform.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 animate-tilt"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-400/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white relative overflow-hidden card-3d hover-lift animate-slide-in-up">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full animate-bounce-subtle"></div>
              <div className="absolute top-8 right-8 w-6 h-6 border-2 border-white rounded-full animate-bounce-subtle animation-delay-500"></div>
              <div className="absolute bottom-8 left-8 w-4 h-4 border-2 border-white rounded-full animate-bounce-subtle animation-delay-1000"></div>
              <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white rounded-full animate-bounce-subtle animation-delay-1500"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-in-up animation-delay-500">
              Ready to Find Your Perfect Creators?
            </h2>
            <p className="text-xl mb-8 opacity-90 animate-slide-in-up animation-delay-1000">
              Join thousands of brands already using BrandConnect to scale their influencer marketing.
            </p>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold hover-lift animate-pulse-glow animate-slide-in-up animation-delay-1500">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 animate-bounce-subtle" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold hover-lift animate-pulse-glow animate-slide-in-up animation-delay-1500">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 animate-bounce-subtle" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                BrandConnect
              </h3>
              <p className="text-gray-400 leading-relaxed">
                AI-powered creator matching platform for modern brands.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BrandConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
