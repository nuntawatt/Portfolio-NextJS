'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInData } from '../core/types';
import { useLogin } from '../hooks/use-login';
import { AuthFormLayout } from '@/shared/components/auth';
import { AuthPageLayout } from '@/shared/components/auth-page-layout';
import { SignInForm } from '../components/signin-form';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

export function SignInContainer() {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  React.useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      signInForm.setValue('email', savedEmail);
      signInForm.setValue('rememberMe', true);
    }
  }, [signInForm]);

  const { login, isLoading, error } = useLogin();

  const onSubmit = (data: SignInData) => {
    login(data, () => {
      if (data.rememberMe) {
        localStorage.setItem('rememberedEmail', data.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      setSuccessMsg('Signed in successfully!');
      signInForm.reset();
      router.push('/');
    });
  };

  return (
    <AuthPageLayout>
      <AuthFormLayout
        title="Welcome back"
        subtitle="Enter your details to access your account"
        footerText="Don't have an account?"
        footerActionText="Sign up"
        onFooterAction={() => router.push(routes.auth.signup)}
        error={error}
        successMsg={successMsg}
      >
        <SignInForm
          form={signInForm}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
