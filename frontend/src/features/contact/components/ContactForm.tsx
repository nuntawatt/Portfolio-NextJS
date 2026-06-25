'use client';

import React from 'react';
import { Send, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/shared/config/site';
import Link from 'next/link';
import { useTranslation } from '@/shared/providers/LanguageProvider';
import { useClipboard, useSpotlight } from '@/shared/lib';
import { useContactForm } from '../hooks/useContactForm';
import { LoadingCard } from '@/shared/ui';

// คอมโพเนนต์ฟอร์มสำหรับติดต่อสอบถาม (Contact Form)
export function ContactForm() {
  // ดึงฟังก์ชันแปลภาษาสำหรับการรองรับหลายภาษา
  const { t } = useTranslation();
  // ดึงสถานะและฟังก์ชันจัดการฟอร์มติดต่อจาก custom hook
  const {
    formData: { name, subject, message },
    formActions: { setName, setSubject, setMessage },
    formState: { isSending, sendSuccess, sendError },
    sessionState: { session, status },
    handleSubmit,
    resetSuccess,
  } = useContactForm();

  // เรียกใช้งาน hook สำหรับการคัดลอกข้อมูลลงคลิปบอร์ด (Clipboard)
  const { copied, copyToClipboard } = useClipboard();
  // เรียกใช้งาน hook สำหรับจำลองแสงไฟส่อง (Spotlight Effect) ตามตำแหน่งเคอร์เซอร์เมาส์
  const { coords, hovered, spotlightHandlers } = useSpotlight();

  // ฟังก์ชันสำหรับคัดลอกอีเมลติดต่อที่กำหนดไว้ในไฟล์ตั้งค่าลงคลิปบอร์ด
  const handleCopy = () => copyToClipboard(siteConfig.contact.email);

  if (status === 'loading') {
    return (
      <div
        className="relative w-full max-w-2xl bg-card/80 border border-border backdrop-blur-2xl rounded-[24px] p-6 sm:p-8 md:p-10 overflow-hidden transition-all duration-300 shadow-xl dark:shadow-none flex flex-col items-center justify-center min-h-[400px]"
      >
        <LoadingCard 
          flat 
          title={t('contact.loading_title') as string} 
          subtitle={t('contact.loading_subtitle') as string} 
        />
      </div>
    );
  }

  if (sendSuccess) {
    return (
      <div
        className="relative w-full max-w-2xl bg-card/80 border border-border backdrop-blur-2xl rounded-[24px] p-6 sm:p-8 md:p-10 overflow-hidden transition-all duration-300 shadow-xl dark:shadow-none"
        {...spotlightHandlers}
      >
        {/* spotlight cursor glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out z-0"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(249,115,22,0.06), transparent 80%)`,
          }}
        />

        {/* Eyebrow Header */}
        <div className="relative z-10 flex items-center justify-between pb-3 mb-6 border-b border-border select-none">
          <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase font-semibold">
            {t('contact.eyebrow')}
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center space-y-6 py-8 text-center">
          <div className="relative w-40 h-40 overflow-hidden rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-zinc-800 shadow-md">
            <Image
              src={siteConfig.animations.success}
              alt="Success!"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="select-none max-w-md">
            <h1 className="text-3xl font-black text-foreground tracking-tight font-heading">
              {t('contact.success_title')}
            </h1>
            <p className="text-sm text-muted-foreground mt-3 font-medium leading-relaxed">
              {t('contact.success_desc')}
            </p>
          </div>
          <button
            type="button"
            onClick={resetSuccess}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl shadow-md hover:shadow-orange-500/10 transition-all duration-200 cursor-pointer"
          >
            {t('contact.send_another')}
          </button>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !session) {
    return (
      <div
        className="relative w-full max-w-2xl bg-card/80 border border-border backdrop-blur-2xl rounded-[24px] p-6 sm:p-8 md:p-10 overflow-hidden transition-all duration-300 shadow-xl dark:shadow-none"
        {...spotlightHandlers}
      >
        {/* spotlight cursor glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out z-0"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(249,115,22,0.06), transparent 80%)`,
          }}
        />

        {/* Eyebrow Header */}
        <div className="relative z-10 flex items-center justify-between pb-3 mb-6 border-b border-border select-none">
          <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase font-semibold">
            {t('contact.eyebrow')}
          </span>
        </div>

        {/* Window Body Form */}
        <div className="relative z-10 space-y-6 py-8 text-center flex flex-col items-center justify-center">
          <div className="select-none max-w-md">
            <h1 className="text-3xl font-black text-foreground tracking-tight font-heading">
              {t('contact.title')}
            </h1>
            <p className="text-sm text-muted-foreground mt-3 font-medium leading-relaxed">
              {t('contact.signin_required')}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
            <Link
              href="/auth/signin"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl shadow-md hover:shadow-orange-500/10 transition-all duration-200 cursor-pointer"
            >
              {t('nav.signin')}
            </Link>
            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto inline-flex items-center justify-center text-foreground bg-transparent border border-border rounded-xl text-sm px-6 py-3 gap-2 cursor-pointer hover:bg-secondary transition-all duration-200 relative group font-semibold"
              title={t('contact.copy_tooltip') as string}
            >
              <span>
                <span className="underline underline-offset-1">{siteConfig.contact.email}</span>
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block transition-transform duration-200"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span
                className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-[11px] px-2.5 py-1 rounded-md shadow-lg transition-all duration-200 select-none ${
                  copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                {t('contact.copied')}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full max-w-2xl bg-card/80 border border-border backdrop-blur-2xl rounded-[24px] p-6 sm:p-8 md:p-10 overflow-hidden transition-all duration-300 shadow-xl dark:shadow-none"
      {...spotlightHandlers}
    >
      {/* spotlight cursor glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out z-0"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(249,115,22,0.06), transparent 80%)`,
        }}
      />

      {/* Eyebrow Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 mb-6 border-b border-border select-none">
        <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase font-semibold">
          {t('contact.eyebrow')}
        </span>
      </div>

      {/* Window Body Form */}
      <div className="relative z-10 space-y-6">
        <div className="text-left select-none">
          <h1 className="text-3xl font-black text-foreground tracking-tight font-heading">
            {t('contact.title')}
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            {t('contact.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* Row: Name and Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">
                {t('contact.name')}
              </label>
              <input
                type="text"
                required
                disabled={isSending}
                placeholder={t('contact.name_placeholder') as string}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all text-sm font-medium disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">
                {t('contact.subject')}
              </label>
              <input
                type="text"
                required
                disabled={isSending}
                placeholder={t('contact.subject_placeholder') as string}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all text-sm font-medium disabled:opacity-50"
              />
            </div>
          </div>

          {/* Message Body */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">
              {t('contact.message')}
            </label>
            <textarea
              rows={5}
              required
              disabled={isSending}
              placeholder={t('contact.message_placeholder') as string}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all text-sm font-medium resize-none disabled:opacity-50"
            />
          </div>

          {sendError && (
            <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl select-none animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{t(sendError)}</span>
            </div>
          )}

          {/* Form actions row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 select-none">
            {/* Submit Pill */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/70 text-white rounded-xl text-sm px-6 py-3 hover:shadow-md hover:shadow-orange-500/10 transition-all duration-200 font-semibold gap-2 cursor-pointer disabled:cursor-not-allowed select-none"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  {t('contact.sending')}
                </>
              ) : (
                <>
                  {t('contact.send')} <Send className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Clipboard Email Option */}
            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto inline-flex items-center justify-center text-foreground bg-transparent border border-border rounded-xl text-sm px-6 py-3 gap-2 cursor-pointer hover:bg-secondary transition-all duration-200 relative group font-semibold"
              title={t('contact.copy_tooltip') as string}
            >
              <span>
                <span className="underline underline-offset-1">{siteConfig.contact.email}</span>
              </span>
              
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block transition-transform duration-200"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>

              {/* Copied Success Tooltip */}
              <span
                className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-[11px] px-2.5 py-1 rounded-md shadow-lg transition-all duration-200 select-none ${
                  copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                {t('contact.copied')}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
