import React from 'react';

type BadgeVariant = 'social-post' | 'ad-copy' | 'email-subject' | 'tagline' | 'blog-intro' | 'twitter' | 'linkedin' | 'instagram' | 'email' | 'facebook' | 'default';

const variantStyles: Record<BadgeVariant, string> = {
  'social-post': 'bg-violet-100 text-violet-700',
  'ad-copy': 'bg-amber-100 text-amber-700',
  'email-subject': 'bg-sky-100 text-sky-600',
  'tagline': 'bg-emerald-100 text-emerald-600',
  'blog-intro': 'bg-rose-100 text-rose-600',
  'twitter': 'bg-sky-100 text-sky-600',
  'linkedin': 'bg-blue-100 text-blue-700',
  'instagram': 'bg-pink-100 text-pink-600',
  'email': 'bg-emerald-100 text-emerald-600',
  'facebook': 'bg-blue-100 text-blue-700',
  'default': 'bg-muted text-muted-foreground',
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}