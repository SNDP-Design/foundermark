import React from 'react';

type BadgeVariant = 'social-post' | 'ad-copy' | 'email-subject' | 'tagline' | 'blog-intro' | 'twitter' | 'linkedin' | 'instagram' | 'email' | 'facebook' | 'default';

const variantStyles: Record<BadgeVariant, string> = {
  'social-post': 'bg-violet-900/40 text-violet-300',
  'ad-copy': 'bg-amber-900/40 text-amber-300',
  'email-subject': 'bg-sky-900/40 text-sky-300',
  'tagline': 'bg-emerald-900/40 text-emerald-300',
  'blog-intro': 'bg-rose-900/40 text-rose-300',
  'twitter': 'bg-sky-900/40 text-sky-300',
  'linkedin': 'bg-blue-900/40 text-blue-300',
  'instagram': 'bg-pink-900/40 text-pink-300',
  'email': 'bg-emerald-900/40 text-emerald-300',
  'facebook': 'bg-blue-900/40 text-blue-300',
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