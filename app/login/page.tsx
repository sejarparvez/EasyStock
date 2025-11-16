'use client';

import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Add authentication logic
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 py-8'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-2xl sm:text-3xl'>Welcome Back</CardTitle>
          <CardDescription>Sign in to your easystock account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='space-y-2'>
              <label htmlFor='email' className='text-sm font-medium'>
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  id='email'
                  type='email'
                  placeholder='you@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='pl-10'
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label htmlFor='password' className='text-sm font-medium'>
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  id='password'
                  type='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pl-10'
                  required
                />
              </div>
            </div>

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className='mt-6 text-center text-sm'>
            <span className='text-muted-foreground'>
              Don't have an account?{' '}
            </span>
            <Link
              href='/signup'
              className='text-primary font-semibold hover:underline'
            >
              Sign up
            </Link>
          </div>

          <div className='mt-4 text-center'>
            <Link href='#' className='text-sm text-primary hover:underline'>
              Forgot password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
