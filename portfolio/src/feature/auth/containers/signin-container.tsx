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
import { useTranslation } from '@/shared/providers/LanguageProvider';

export function SignInContainer() {
  const router = useRouter();
  const { t } = useTranslation();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
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
      setSuccessMsg(t('auth.signin_success') as string);
      signInForm.reset();
      router.push('/');
    });
  };

  return (
    <AuthPageLayout>
      <AuthFormLayout
        title={t('auth.signin_title') as string}
        subtitle={t('auth.signin_subtitle') as string}
        footerText={t('auth.dont_have_account') as string}
        footerActionText={t('auth.signup_link') as string}
        onFooterAction={() => router.push(routes.auth.signup)}
        error={error ? (t(error) as string) : undefined}
        successMsg={successMsg ? (t(successMsg) as string) : undefined}
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
