'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router?.push('/');
  };

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history?.back();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: '#000000' }}>
      <div className="text-center max-w-md">
        {/* 404 number */}
        <h1
          className="text-[120px] font-bold leading-none mb-6 tracking-[-4px]"
          style={{
            background: 'linear-gradient(90deg, #ededed 0%, #3a3a3a 50%, #ededed 100%) 0% 0% / 200% 100% text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </h1>

        <h2 className="text-[22px] font-bold mb-2 tracking-[-0.4px]" style={{ color: '#ededed' }}>Page Not Found</h2>
        <p className="text-[14px] mb-8" style={{ color: '#8a8a8a' }}>
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoBack}
            className="btn-primary flex items-center justify-center gap-2 text-[14px] px-6 py-3 rounded-[10px]"
          >
            ← Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="btn-secondary flex items-center justify-center gap-2 text-[14px] px-6 py-3 rounded-[10px]"
          >
            ⌂ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}