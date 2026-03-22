'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, signUpSchema } from '../schemas/auth.schema';
import { SignInData, SignUpData } from '../types/auth.type';
import { useLogin } from '../hooks/use-login';
import { useRegister } from '../hooks/use-register';
import { AuthFormLayout } from '../components/auth-form';
import { SignInForm } from '../components/sign-in-form';
import { SignUpForm } from '../components/sign-up-form';

export function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Hook Form instances
  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema as any),
    mode: 'onChange',
  });

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema as any),
    mode: 'onChange',
  });

  // Services Hooks
  const { login, isLoading: isLoginLoading, error: loginError, resetError: resetLoginError } = useLogin();
  const { register, isLoading: isRegisterLoading, error: registerError, resetError: resetRegisterError } = useRegister();

  const onSignInSubmit = (data: SignInData) => {
    login(data, () => {
      setSuccessMsg('Signed in successfully!');
      signInForm.reset();
    });
  };

  const onSignUpSubmit = (data: SignUpData) => {
    register(data, () => {
      setSuccessMsg('Account created successfully! Please log in.');
      signUpForm.reset();
      setIsLogin(true);
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setSuccessMsg(null);
    resetLoginError();
    resetRegisterError();
    signInForm.reset();
    signUpForm.reset();
  };

  if (isLogin) {
    return (
      <AuthFormLayout
        title="Welcome back"
        subtitle="Enter your details to access your account"
        footerText="Don't have an account?"
        footerActionText="Sign up"
        onFooterAction={toggleMode}
        error={loginError}
        successMsg={successMsg}
      >
        <SignInForm
          form={signInForm}
          onSubmit={onSignInSubmit}
          isLoading={isLoginLoading}
        />
      </AuthFormLayout>
    );
  }

  return (
    <AuthFormLayout
      title="Create an account"
      subtitle="Start your journey with us today"
      footerText="Already have an account?"
      footerActionText="Sign in"
      onFooterAction={toggleMode}
      error={registerError}
      successMsg={successMsg}
    >
      <SignUpForm
        form={signUpForm}
        onSubmit={onSignUpSubmit}
        isLoading={isRegisterLoading}
      />
    </AuthFormLayout>
  );
}
