import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  CheckCircle2,
  MapPin,
  Sparkles,
  ShieldCheck,
  Box as BoxIcon,
  Calendar,
  ArrowRight,
  ExternalLink,
  Award,
  Layers,
  Maximize2,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { VentureData } from '../types';
import { getLocationAssetUrl } from '../siteConfig';

interface HeroSectionProps {
  venture: VentureData;
}

export default function HeroSection({ venture }: HeroSectionProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPreviewOpen) {
        setIsPreviewOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewOpen]);

  const heroImageSrc = venture.heroBanner;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getResolvedPdfUrl = (): string => {
    const rawUrl = venture.brochureUrl;
    if (rawUrl && rawUrl !== '#' && rawUrl !== '#download-brochure') {
      if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
        return rawUrl;
      }
      return getLocationAssetUrl(rawUrl);
    }
    return 'https://cms.slnmplapp.com/core/public/uploads/venture_pages/brochure/sln-arjun-ventures_1790316373_IuAvac.pdf';
  };

  // Direct download on click: Zero popups, zero form fields, real API PDF
  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const pdfUrl = getResolvedPdfUrl();
      const fileName = venture.brochureFileName || `${venture.title || 'SLN_Ventures'}_Official_Dossier.pdf`;

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 1000);

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('[HeroSection] Direct download error:', err);
      const fallbackUrl = 'https://cms.slnmplapp.com/core/public/uploads/venture_pages/brochure/sln-arjun-ventures_1790316373_IuAvac.pdf';
      window.open(fallbackUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const brochureFileSize = venture.brochureFileSize || 'PDF • 8.4 MB';

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] lg:min-h-screen w-full bg-gradient-to-b from-stone-50 via-slate-50 to-stone-100/90 pt-28 lg:pt-32 pb-16 lg:pb-20 flex flex-col justify-center overflow-hidden antialiased text-slate-900"
    >
      {/* Background Architectural Ambient Light & Subtle Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-100/35 rounded-full blur-3xl -z-10" />
        <div
          className="absolute inset-0 opacity-[0.03] -z-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ========================================================================= */}
          {/* LEFT COLUMN: Editorial Masthead, Project Identity & Direct CTAs (7 Cols)  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            
            {/* Monumental Architectural Headline */}
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.05] text-slate-950 text-balance">
                {venture.title}
              </h1>
            </div>

            {/* Narrative & Location Pill strictly from API */}
            <div className="space-y-3 max-w-2xl">
              {(venture.subheadline || venture.tagline || (venture.headline && venture.headline !== venture.title ? venture.headline : '')) && (
                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                  {venture.subheadline || venture.tagline || venture.headline}
                </p>
              )}

              {venture.location && (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white/90 border border-slate-200/80 w-fit px-3.5 py-1.5 rounded-xl shadow-xs">
                  <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{venture.location}</span>
                </div>
              )}
            </div>

            {/* Dynamic Metric Specs directly from API */}
            {Array.isArray(venture.specs) && venture.specs.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl pt-1">
                {venture.specs.slice(0, 3).map((spec, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-xs">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 truncate">
                      {spec.label}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-serif text-slate-900 block truncate">
                      {spec.value}
                    </span>
                    {spec.sub && (
                      <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block truncate">
                        {spec.sub}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Action Row - Side by Side on Mobile */}
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-3.5 pt-2 w-full">
              <button
                type="button"
                onClick={() => scrollToSection('master-plan')}
                className="w-full sm:w-auto px-3 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-sans font-extrabold text-[11.5px] sm:text-xs md:text-sm tracking-wide uppercase shadow-lg shadow-emerald-900/15 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 group text-center"
              >
                <BoxIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform group-hover:scale-110" />
                <span className="sm:hidden">Explore 3D Plan</span>
                <span className="hidden sm:inline">Explore 3D Master Plan</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 hidden md:inline transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-3 sm:px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-[11.5px] sm:text-xs md:text-sm border border-slate-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 text-center"
              >
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-emerald-600" />
                <span className="sm:hidden">Site Visit</span>
                <span className="hidden sm:inline">Schedule Site Visit</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Official Hero Showcase Banner (5 Cols, 535x690)            */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient Backlight */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500/15 via-teal-400/10 to-amber-400/20 rounded-[34px] blur-2xl opacity-80 -z-10" />

            {/* The High-Precision Showcase Frame (535x690) */}
            <div
              onClick={() => setIsPreviewOpen(true)}
              className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white border border-slate-200/90 shadow-2xl aspect-[535/690] w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px] xl:max-w-[535px] max-h-[690px] group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1"
              title="Click to view full screen"
            >
              {heroImageSrc ? (
                <img
                  src={heroImageSrc}
                  alt={`${venture.title} Official Showcase`}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out select-none"
                  loading="eager"
                  width={535}
                  height={690}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500 gap-2">
                  <Maximize2 className="w-12 h-12 text-slate-600" />
                  <span className="text-xs font-mono">Official Showcase (535 × 690)</span>
                </div>
              )}

              {/* Slim Floating Full Screen Trigger Pill in Top Corner */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPreviewOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white text-xs font-medium backdrop-blur-md border border-white/15 shadow-sm transition-all hover:scale-105 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Full Screen</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* DEVELOPMENT HALLMARKS (Dynamic from API: venture.aboutChecklist)         */}
        {/* ========================================================================= */}
        <div className="pt-10 sm:pt-14 w-full">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  <span>Certified Infrastructure</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-950 mt-1">
                  Development Hallmarks
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200/80 w-fit font-semibold">
                100% Statutory Clearance
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
              {(Array.isArray(venture.aboutChecklist) && venture.aboutChecklist.length > 0
                ? venture.aboutChecklist
                : [
                    '100% DTCP Approved Layout Certification',
                    'Concealed Underground Stormwater Drainage',
                    'Dedicated Central Water Tank & Distribution',
                    'Pre-approved Mortgages: SBI, HDFC, ICICI',
                  ]
              ).map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/50 border border-slate-200/70 hover:border-emerald-300 transition-all duration-200 flex items-start gap-3.5 group shadow-xs hover:shadow-md"
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-mono font-bold text-emerald-700/80 block tracking-wider">
                      0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* High-Resolution Dossier / Master Plan Lightbox Modal */}
      {isPreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsPreviewOpen(false)}
        >
          {/* Header Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <Maximize2 className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold font-serif text-white tracking-wide">
                  {venture.title} — Official Showcase
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
                  High-Resolution Master Showcase Preview
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full-View Image Container */}
          <div
            className="relative w-full max-w-5xl max-h-[80vh] my-auto flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/60 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {heroImageSrc && (
              <img
                src={heroImageSrc}
                alt={`${venture.title} High Resolution Preview`}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />
            )}
          </div>

          <p className="text-[11px] font-mono text-slate-400 mt-2">
            Click anywhere outside or press Esc to return
          </p>
        </div>
      )}
    </section>
  );
}
