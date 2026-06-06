'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Package,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const navItems = [
  { key: 'nav-dashboard', href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'nav-generator', href: '/content-generator', label: 'Generate', icon: Sparkles, badge: null },
  { key: 'nav-library', href: '/content-library', label: 'Library', icon: BookOpen, badge: '24' },
  { key: 'nav-product', href: '/product-setup', label: 'Product', icon: Package },
];

const bottomItems = [
  { key: 'nav-settings', href: '/account-settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`sidebar-transition flex flex-col bg-card border-r border-border shrink-0 relative z-20 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-border ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <span className="font-bold text-lg tracking-tight text-foreground">
            FounderMark
          </span>
        )}
      </div>

      {/* Credits pill */}
      {!collapsed && (
        <div className="mx-3 mt-4 mb-1 px-3 py-2.5 rounded-xl gradient-card-violet border border-violet-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-secondary-foreground flex items-center gap-1.5">
              <Zap size={12} className="text-accent" />
              Credits
            </span>
            <span className="text-xs font-bold font-tabular text-secondary-foreground">47 / 200</span>
          </div>
          <div className="h-1.5 rounded-full bg-violet-200 overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: '23.5%' }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">153 credits left this month</p>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative ${
                active
                  ? 'bg-secondary text-secondary-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon
                size={18}
                className={`shrink-0 ${active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}
              />
              {!collapsed && (
                <span className="text-sm truncate flex-1">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="text-xs font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-md">
                  {item.badge}
                </span>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
              )}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2 py-1 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-dropdown">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom items */}
      <div className="px-2 py-3 border-t border-border space-y-0.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative ${
                active
                  ? 'bg-secondary text-secondary-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon size={18} className={`shrink-0 ${active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
              {!collapsed && <span className="text-sm">{item.label}</span>}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2 py-1 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-dropdown">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}

        {/* User profile */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-xl hover:bg-muted transition-all duration-150 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary-foreground">NP</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Nadia Patel</p>
              <p className="text-xs text-muted-foreground truncate">nadia@buildfast.io</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center py-1 group relative">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center cursor-pointer">
              <span className="text-xs font-bold text-primary-foreground">NP</span>
            </div>
            <span className="absolute left-full ml-3 px-2 py-1 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-dropdown">
              Nadia Patel
            </span>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-all duration-150 z-30 shadow-card"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}