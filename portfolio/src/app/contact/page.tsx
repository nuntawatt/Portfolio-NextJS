'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Navbar, Footer } from '@/features/navigation';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(siteConfig.contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    // Build the pre-filled mailto link
    const mailtoLink = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Hello Morgorn,\n\nYou have received a message from ${name} (${email}):\n\n${message}\n\nBest regards,\n${name}`
    )}`;

    // Open standard email client
    window.location.href = mailtoLink;
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen flex flex-col justify-between">
      <Navbar />

      {/* Background Grid Overlays matching Home Page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {/* light mode grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '60px 60px',
          }}
        />
        {/* dark mode grid */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Contact window mockup container */}
        <div
          className="relative w-full max-w-2xl bg-white/80 dark:bg-white/[0.025] border border-gray-200/80 dark:border-white/[0.07] backdrop-blur-2xl rounded-[24px] p-6 sm:p-8 md:p-10 overflow-hidden transition-all duration-300 shadow-xl dark:shadow-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* spotlight cursor glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out z-0"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(249,115,22,0.06), transparent 80%)`,
            }}
          />

          {/* Window Header */}
          <div className="relative z-10 flex items-center justify-between pb-4 mb-6 border-b border-black/5 dark:border-white/5 select-none">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-red-400/80 transition-colors" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-yellow-400/80 transition-colors" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-green-400/80 transition-colors" />
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] text-black/45 dark:text-white/45 tracking-widest font-bold">
                CONTACT // COMPOSE
              </span>
            </div>
          </div>

          {/* Window Body Form */}
          <div className="relative z-10 space-y-6">
            <div className="text-left select-none">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight font-heading">
                Send a message.
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                Have a question, project, or opportunity? Compose below and it will send directly to my email.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {/* Row: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider select-none">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm font-medium"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider select-none">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider select-none">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Backend Opportunity"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm font-medium"
                />
              </div>

              {/* Message Body */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider select-none">
                  Message Details
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell me more details about your inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm font-medium resize-none"
                />
              </div>

              {/* Form actions row */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 select-none">
                {/* Submit Pill */}
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm px-6 py-2.5 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 font-semibold gap-2 cursor-pointer"
                >
                  Send via Email <Send className="w-4 h-4" />
                </button>

                {/* Clipboard Email Option */}
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="w-full sm:w-auto inline-flex items-center justify-center text-gray-700 dark:text-gray-200 bg-transparent border border-gray-300 dark:border-white/20 rounded-full text-sm px-6 py-2.5 gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 relative group font-semibold"
                  title="Click to copy email address"
                >
                  <span>
                    Copy address: <span className="underline underline-offset-1">{siteConfig.contact.email}</span>
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
                    className="inline-block transition-transform duration-300 group-hover:scale-110"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>

                  {/* Copied Success Tooltip */}
                  <span
                    className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-[11px] px-2.5 py-1 rounded-md shadow-lg transition-all duration-300 select-none ${
                      copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
                  >
                    Copied!
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
