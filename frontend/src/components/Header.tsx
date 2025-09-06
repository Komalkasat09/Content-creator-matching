import { useAuth } from '@/app/context/AuthContext';
import { Button } from './ui/button';
import { LogOut, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from './toggle';

export default function Header() {
  const { logout, user } = useAuth();
  
  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-lg animate-slide-in-up">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/dashboard" className="flex items-center space-x-2 group">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:animate-glow transition-all duration-300">
            BrandConnect
          </h1>
        </Link>
        
        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-3 animate-slide-in-right">
              <div className="flex items-center space-x-2 bg-gray-100/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200 dark:border-gray-600 hover-lift transition-all duration-300">
                <User className="h-4 w-4 text-gray-700 dark:text-gray-300 animate-bounce-subtle" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {user.email?.split('@')[0] || user.username}
                </span>
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white card-3d transition-all duration-300"
              >
                <Settings className="h-4 w-4 animate-float" />
              </Button>
              
              <ModeToggle />
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={logout}
                className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-600 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 card-3d hover-glow transition-all duration-300"
              >
                <LogOut className="h-4 w-4 animate-bounce-subtle" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}