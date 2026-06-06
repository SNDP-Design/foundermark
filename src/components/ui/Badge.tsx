import React from 'react';

type BadgeVariant = 'social-post' | 'ad-copy' | 'email-subject' | 'tagline' | 'blog-intro' | 'twitter' | 'linkedin' | 'instagram' | 'email' | 'facebook' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-[8px] py-[3px] rounded-full text-[10px] font-semibold ${className}`}
      style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}
    >
      {children}
    </span>
  );
}