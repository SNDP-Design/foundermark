import React from 'react';
import AuthForm from './components/AuthForm';
import AuthBrandPanel from './components/AuthBrandPanel';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex" style={{ background: '#000000' }}>
      <AuthBrandPanel />
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: '#000000' }}>
        <AuthForm />
      </div>
    </div>
  );
}