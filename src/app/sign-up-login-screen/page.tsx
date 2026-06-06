import React from 'react';
import AuthForm from './components/AuthForm';
import AuthBrandPanel from './components/AuthBrandPanel';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex">
      <AuthBrandPanel />
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <AuthForm />
      </div>
    </div>
  );
}