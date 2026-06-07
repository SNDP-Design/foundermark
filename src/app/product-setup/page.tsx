import React from 'react';
import AppLayout from '@/components/AppLayout';
import ProductSetupWizard from './components/ProductSetupWizard';

export default function ProductSetupPage() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto fade-in">
        <div className="mb-8">
          <p className="text-[12px] font-medium mb-[6px]" style={{ color: '#8a8a8a' }}>Brand Kit · Product Setup</p>
          <h1 className="text-[22px] font-bold tracking-[-0.4px]" style={{ color: '#ededed' }}>Product Profile</h1>
          <p className="text-[13px] mt-[4px]" style={{ color: '#8a8a8a' }}>
            Tell FounderMark about your product so the AI can generate content that sounds like you.
          </p>
        </div>
        <ProductSetupWizard />
      </div>
    </AppLayout>
  );
}