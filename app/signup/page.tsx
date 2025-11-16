'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail, Store, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type SignupFormValues, signupSchema } from '@/lib/schemas/auth';
import { useSignUp } from '@/services/auth';

// ──────────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────────
export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      shopName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useSignUp();

  function onSubmit(values: SignupFormValues) {
    mutate(values);
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 py-8'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-2xl sm:text-3xl'>Create Account</CardTitle>
          <CardDescription>Get started with easystock</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* Full Name */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                        <Input
                          id='name'
                          placeholder='John Doe'
                          className='pl-10'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Shop Name */}
              <FormField
                control={form.control}
                name='shopName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Name</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Store className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                        <Input
                          id='shopName'
                          placeholder='Your Glass Shop'
                          className='pl-10'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                        <Input
                          id='email'
                          type='email'
                          placeholder='you@example.com'
                          className='pl-10'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                        <Input
                          id='password'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Create a password'
                          className='pl-10 pr-10'
                          {...field}
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='absolute right-1 top-1 h-8 w-8'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                          <span className='sr-only'>
                            {showPassword ? 'Hide' : 'Show'} password
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                        <Input
                          id='confirmPassword'
                          type={showConfirm ? 'text' : 'password'}
                          placeholder='Confirm your password'
                          className='pl-10 pr-10'
                          {...field}
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='absolute right-1 top-1 h-8 w-8'
                          onClick={() => setShowConfirm(!showConfirm)}
                        >
                          {showConfirm ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                          <span className='sr-only'>
                            {showConfirm ? 'Hide' : 'Show'} confirm password
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </Form>

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
