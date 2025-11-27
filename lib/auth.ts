import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { sendEmailAction } from '@/actions/send-email-action';
import { prisma } from './prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  trustedOrigins: [`${process.env.NEXT_PUBLIC_API_URL}`],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
    requireEmailVerification: true,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set('callbackURL', '/auth/verify');
      await sendEmailAction({
        to: user.email,
        subject: 'Verify your email address',
        meta: {
          description:
            'Please verify your email address to complete the registration process. Click the button below to verify your email and activate your account.',
          link: String(link),
          callToActionText: 'Verify Email Address',
        },
      });
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60,
  },
});
