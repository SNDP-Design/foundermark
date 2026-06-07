'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Camera, Check } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type ProfileData = {
  fullName: string;
  email: string;
  company: string;
  bio: string;
};

export default function ProfileSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const { user } = useAuth();
  const supabase = createClient();

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ProfileData>({
    defaultValues: { fullName: '', email: '', company: '', bio: '' },
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) { setIsLoading(false); return; }
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        if (data) {
          reset({ fullName: data.full_name || '', email: data.email || user.email || '', company: data.company || '', bio: data.bio || '' });
        } else {
          reset({ fullName: user.user_metadata?.full_name || '', email: user.email || '', company: '', bio: '' });
        }
      } catch (err: any) {
        console.log('Profile load error:', err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [user]);

  const onSubmit = handleSubmit(async (data) => {
    if (!user) { toast.error('You must be logged in to update your profile.'); return; }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('user_profiles').upsert({
        id: user.id, email: data.email, full_name: data.fullName, company: data.company, bio: data.bio,
      }, { onConflict: 'id' });
      if (error) throw error;
      setSavedAt('Just now');
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  });

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || 'FM';

  if (isLoading) {
    return (
      <div className="rounded-[14px] p-10 text-center" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)', border: '1px solid #e5e7eb' }}>
        <Loader2 size={24} className="animate-spin mx-auto" style={{ color: '#9ca3af' }} />
        <p className="text-[13px] mt-3" style={{ color: '#9ca3af' }}>Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[14px] p-6" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)', border: '1px solid #e5e7eb' }}>
        <h2 className="text-[16px] font-bold tracking-[-0.3px] mb-5" style={{ color: '#111111' }}>Profile Information</h2>

        {/* Avatar */}
        <div className="flex items-center gap-5 mb-6 pb-6" style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div className="relative">
            <div className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #d1d5db, #9ca3af)' }}>
              <span className="text-[18px] font-bold" style={{ color: '#ffffff' }}>{initials}</span>
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:bg-[#f3f4f6]"
              style={{ background: '#ffffff', border: '1px solid #e5e7eb', color: '#6b7280' }}
              aria-label="Change profile photo"
            >
              <Camera size={11} />
            </button>
          </div>
          <div>
            <p className="text-[13px] font-semibold" style={{ color: '#111111' }}>Profile photo</p>
            <p className="text-[11px] mt-[2px]" style={{ color: '#9ca3af' }}>JPG or PNG · Max 2MB</p>
            <button type="button" className="text-[11px] font-semibold mt-[6px] transition-opacity hover:opacity-70" style={{ color: '#111111' }}>
              Upload new photo
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#6b7280' }} htmlFor="fullName">Full name</label>
              <input id="fullName" type="text" className="input-base" {...register('fullName', { required: 'Full name is required' })} />
              {errors.fullName && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#6b7280' }} htmlFor="company">Company / Product</label>
              <input id="company" type="text" className="input-base" {...register('company')} />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#6b7280' }} htmlFor="email">Email address</label>
            <p className="text-[11px] mb-[6px]" style={{ color: '#9ca3af' }}>Used for login and notifications</p>
            <input id="email" type="email" className="input-base" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })} />
            {errors.email && <p className="text-[11px] mt-1" style={{ color: '#dc2626' }}>{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-[12px] font-semibold uppercase tracking-[0.4px] mb-[6px]" style={{ color: '#6b7280' }} htmlFor="bio">Short bio</label>
            <p className="text-[11px] mb-[6px]" style={{ color: '#9ca3af' }}>Helps personalize AI content — optional</p>
            <textarea id="bio" rows={3} className="input-base resize-none" {...register('bio')} />
          </div>

          <div className="flex items-center justify-between pt-2">
            {savedAt && !isDirty ? (
              <span className="text-[12px] flex items-center gap-1.5 font-semibold" style={{ color: '#16a34a' }}>
                <Check size={13} /> Saved {savedAt}
              </span>
            ) : <span />}
            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="btn-primary text-[13px] flex items-center gap-2 min-w-[140px] justify-center"
            >
              {isSubmitting ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}