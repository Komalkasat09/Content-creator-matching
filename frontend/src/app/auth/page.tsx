"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { User, Mail, Lock } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function AuthPage() {
  // Remove this line since we're already importing toast from sonner
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(values),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Login failed');
      }
      
      const data = await response.json();
      login(data.access_token);
      toast('Login Successful', { description: 'Welcome back!' });
    } catch (error: any) {
      if (error.message === 'Failed to fetch') {
        toast('Connection Error', { 
          description: 'Cannot connect to server. Please make sure the backend is running.' 
        });
      } else {
        toast('Login Error', { description: error.message });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
     setIsLoading(true);
     try {
       const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
       });
       
       if (!response.ok) {
         const data = await response.json();
         throw new Error(data.detail || 'Registration failed');
       }
       
       const data = await response.json();
       toast('Registration Successful', { description: 'You can now log in.' });
       // You could automatically log them in here as well
     } catch (error: any) {
        if (error.message === 'Failed to fetch') {
          toast('Connection Error', { 
            description: 'Cannot connect to server. Please make sure the backend is running.' 
          });
        } else {
          toast('Registration Error', { description: error.message });
        }
     } finally {
        setIsLoading(false);
     }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent relative overflow-hidden">
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-pink-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
      </div> */}
      
      <Tabs defaultValue="login" className="w-[400px] relative z-20 animate-slide-in-up">
        <TabsList className="grid w-full grid-cols-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
          <TabsTrigger value="login" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 transition-all duration-300 hover-lift">Login</TabsTrigger>
          <TabsTrigger value="register" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 transition-all duration-300 hover-lift">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="animate-slide-in-left animation-delay-500">
          <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-xl border-gray-200 dark:border-gray-700 card-3d hover-lift">
            <CardHeader className="animate-slide-in-up animation-delay-1000">
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full animate-float">
                  <User className="h-5 w-5 text-blue-600 animate-bounce-subtle" />
                </div>
                Login
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    type="text" 
                    {...loginForm.register('username')} 
                    placeholder="Enter your username"
                  />
                  {loginForm.formState.errors.username && (
                    <p className="text-sm text-red-500">{loginForm.formState.errors.username.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    {...loginForm.register('password')} 
                    placeholder="Enter your password"
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">{isLoading ? "Logging in..." : "Login"}</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register" className="animate-slide-in-right animation-delay-500">
          <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-xl border-gray-200 dark:border-gray-700 card-3d hover-lift">
            <CardHeader className="animate-slide-in-up animation-delay-1000">
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full animate-float">
                  <Mail className="h-5 w-5 text-green-600 animate-bounce-subtle" />
                </div>
                Register
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">Create a new account to get started.</CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-username">Username</Label>
                  <Input 
                    id="reg-username" 
                    type="text" 
                    {...registerForm.register('username')} 
                    placeholder="Choose a username"
                  />
                  {registerForm.formState.errors.username && (
                    <p className="text-sm text-red-500">{registerForm.formState.errors.username.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input 
                    id="reg-email" 
                    type="email" 
                    {...registerForm.register('email')} 
                    placeholder="Enter your email"
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input 
                    id="reg-password" 
                    type="password" 
                    {...registerForm.register('password')} 
                    placeholder="Choose a password"
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">{isLoading ? "Registering..." : "Register"}</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


