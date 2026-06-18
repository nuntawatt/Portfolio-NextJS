'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpData } from '../core/types';
import { useRegister } from '../hooks/use-register';
import { AuthFormLayout } from '@/shared/components/auth';
import { AuthPageLayout } from '@/shared/components/auth-page-layout';
import { SignUpForm } from '../components/signup-form';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

export function SignUpContainer() {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const { register, isLoading, error } = useRegister();

  const onSubmit = (data: SignUpData) => {
    register(data, () => {
      setSuccessMsg('Account created successfully! Please check your email to verify your account before logging in.');
      signUpForm.reset();
      setTimeout(() => {
        router.push(routes.auth.signin);
      }, 5000);
    });
  };

  return (
    <AuthPageLayout>
      <AuthFormLayout
        title="Create an account"
        subtitle="Start your journey with us today"
        footerText="Already have an account?"
        footerActionText="Sign in"
        onFooterAction={() => router.push(routes.auth.signin)}
        error={error}
        successMsg={successMsg}
      >
        <SignUpForm
          form={signUpForm}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
