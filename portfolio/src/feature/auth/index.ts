// Re-export everything for encapsulated structured architecture
export * from './components/signin-form';
export * from './components/signup-form';
export * from './components/auth-callback';

export * from './containers/signin-container';
export * from './containers/signup-container';
export * from './containers/forgot-password-container';
export * from './containers/reset-password-container';
export * from './containers/verify-email-container';

export * from './hooks/use-auth';
export * from './hooks/use-login';
export * from './hooks/use-register';
export * from './hooks/use-forgot-password';
export * from './hooks/use-reset-password';
export * from './hooks/use-verify-email';
export * from './hooks/use-auth-callback';

export * from './core/types';
export * from './core/lib';
export * from './stores/store';
