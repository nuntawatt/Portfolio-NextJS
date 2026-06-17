'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function ContactForm() {
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
    <div
      className="relative w-full max-w-2xl bg-card/80 border border-border backdrop-blur-2xl rounded-[24px] p-6 sm:p-8 md:p-10 overflow-hidden transition-all duration-300 shadow-xl dark:shadow-none"
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

      {/* Eyebrow Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 mb-6 border-b border-border select-none">
        <span className="font-mono text-[9px] text-muted-foreground/80 tracking-widest uppercase font-semibold">
          Get In Touch
        </span>
      </div>

      {/* Window Body Form */}
      <div className="relative z-10 space-y-6">
        <div className="text-left select-none">
          <h1 className="text-3xl font-black text-foreground tracking-tight font-heading">
            Send a message.
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium">
            Have a question, project, or opportunity? Compose below and it will send directly to my email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* Row: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all text-sm font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">
                Your Email
              </label>
              <input
                type="email"
                required
                placeholder="e.g. john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">
              Subject
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Backend Opportunity"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all text-sm font-medium"
            />
          </div>

          {/* Message Body */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">
              Message Details
            </label>
            <textarea
              rows={5}
              required
              placeholder="Tell me more details about your inquiry..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all text-sm font-medium resize-none"
            />
          </div>

          {/* Form actions row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 select-none">
            {/* Submit Pill */}
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm px-6 py-3 hover:shadow-md hover:shadow-orange-500/10 transition-all duration-200 font-semibold gap-2 cursor-pointer"
            >
              Send via Email <Send className="w-4 h-4" />
            </button>

            {/* Clipboard Email Option */}
            <button
              type="button"
              onClick={copyToClipboard}
              className="w-full sm:w-auto inline-flex items-center justify-center text-foreground bg-transparent border border-border rounded-xl text-sm px-6 py-3 gap-2 cursor-pointer hover:bg-secondary transition-all duration-200 relative group font-semibold"
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
                Copied!
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
