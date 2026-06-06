import React from 'react';
import { Sparkles, BookOpen, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';


const actions = [
  {
    key: 'qa-generate',
    href: '/content-generator',
    icon: Sparkles,
    label: 'Generate Content',
    description: 'Create new marketing copy with AI',
    primary: true,
  },
  {
    key: 'qa-library',
    href: '/content-library',
    icon: BookOpen,
    label: 'Browse Library',
    description: 'View and reuse saved content',
    primary: false,
  },
  {
    key: 'qa-product',
    href: '/product-setup',
    icon: Package,
    label: 'Update Product',
    description: 'Refine your product profile',
    primary: false,
  },
];

export default function QuickActions() {
  return (
    <div className="card-base p-6 h-full flex flex-col">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Jump into your next task</p>
      </div>
      <div className="space-y-3 flex-1">
        {actions?.map((action) => {
          const Icon = action?.icon;
          return (
            <Link
              key={action?.key}
              href={action?.href}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-150 group ${
                action?.primary
                  ? 'border-primary/30 bg-secondary hover:bg-violet-900/40'
                  : 'border-border hover:border-violet-700/50 hover:bg-violet-900/10'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                action?.primary ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-secondary group-hover:text-primary'
              } transition-colors`}>
                <Icon size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${action?.primary ? 'text-primary' : 'text-foreground'}`}>{action?.label}</p>
                <p className="text-xs text-muted-foreground">{action?.description}</p>
              </div>
              <ArrowRight size={15} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}