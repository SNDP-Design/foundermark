import React from 'react';
import AppLayout from '@/components/AppLayout';
import ProductSetupWizard from './components/ProductSetupWizard';

export default function ProductSetupPage() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Product Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tell FounderMark about your product so the AI can generate content that sounds like you.
          </p>
        </div>
        <ProductSetupWizard />
      </div>
    </AppLayout>
  );
}