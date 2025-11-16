'use client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { SignupFormValues } from '@/lib/schemas/auth';

export function useSignUp() {
  const router = useRouter();

  return useMutation({
    mutationFn: (values: SignupFormValues) => axios.post('/api/signup', values),
    onSuccess: (res) => {
      toast.success(res.data.message);
      router.push('/login');
    },
    // biome-ignore lint/suspicious/noExplicitAny: error
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'An error occurred');
    },
  });
}
