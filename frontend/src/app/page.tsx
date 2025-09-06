"use client";
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import LandingPage from './landing/page';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect to dashboard if user is authenticated
    // Don't redirect if not authenticated - show landing page instead
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Show landing page for non-authenticated users
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // This should not render as useEffect will redirect, but just in case
  return <LandingPage />;
}