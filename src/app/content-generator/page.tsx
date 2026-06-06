import React from 'react';
import AppLayout from '@/components/AppLayout';
import GeneratorWorkspace from './components/GeneratorWorkspace';

export default function ContentGeneratorPage() {
  return (
    <AppLayout>
      <div className="fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Content Generator</h1>
          <p className="text-sm text-muted-foreground mt-1">Describe what you need — the AI writes it for you in seconds.</p>
        </div>
        <GeneratorWorkspace />
      </div>
    </AppLayout>
  );
}