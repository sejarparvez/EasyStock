'use server';

import { auth } from '@/lib/auth';

export const signIn = async () => {
  await auth.api.signInEmail({
    body: {
      email: 'FbN4t@example.com',
      password: 'password123',
    },
  });
};

export const signUp = async () => {
  await auth.api.signUpEmail({
    body: {
      email: 'FbN4t@example.com',
      password: 'password123',
      name: 'John Doe',
    },
  });
};
