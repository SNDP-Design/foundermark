import React from 'react';
import AppLayout from '@/components/AppLayout';
import GeneratorWorkspace from './components/GeneratorWorkspace';

export default function ContentGeneratorPage() {
  return (
    <AppLayout>
      <div className="fade-in">
        <div className="mb-6">
          <p className="text-[12px] font-medium mb-[6px]" style={{ color: '#8a8a8a' }}>Content Engine · Multi-Platform</p>
          <h1 className="text-[22px] font-bold tracking-[-0.4px]" style={{ color: '#ededed' }}>Content Generator</h1>
          <p className="text-[13px] mt-[4px]" style={{ color: '#8a8a8a' }}>Describe what you need — the AI writes it for you in seconds.</p>
        </div>
        <GeneratorWorkspace />
      </div>
    </AppLayout>
  );
}