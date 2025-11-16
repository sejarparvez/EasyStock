'use client';

import { Lock, Mail, Store, User } from 'lucide-react';
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

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    shopName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    // TODO: Add signup logic
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 py-8'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-2xl sm:text-3xl'>Create Account</CardTitle>
          <CardDescription>Get started with easystock</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className='space-y-4'>
            <div className='space-y-2'>
              <label htmlFor='name' className='text-sm font-medium'>
                Full Name
              </label>
              <div className='relative'>
                <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='John Doe'
                  value={formData.name}
                  onChange={handleChange}
                  className='pl-10'
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label htmlFor='shopName' className='text-sm font-medium'>
                Shop Name
              </label>
              <div className='relative'>
                <Store className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  id='shopName'
                  name='shopName'
                  type='text'
                  placeholder='Your Glass Shop'
                  value={formData.shopName}
                  onChange={handleChange}
                  className='pl-10'
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label htmlFor='email' className='text-sm font-medium'>
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={handleChange}
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
                  name='password'
                  type='password'
                  placeholder='Create a password'
                  value={formData.password}
                  onChange={handleChange}
                  className='pl-10'
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label htmlFor='confirmPassword' className='text-sm font-medium'>
                Confirm Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  placeholder='Confirm your password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='pl-10'
                  required
                />
              </div>
            </div>

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className='mt-6 text-center text-sm'>
            <span className='text-muted-foreground'>
              Already have an account?{' '}
            </span>
            <Link
              href='/login'
              className='text-primary font-semibold hover:underline'
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
