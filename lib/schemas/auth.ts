import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    shopName: z.string().min(2, 'Shop name must be at least 2 characters'),
    email: z.email('Please enter a valid email'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain uppercase, lowercase, and number',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
