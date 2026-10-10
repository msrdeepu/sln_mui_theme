import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Sparkles,
  Trees,
  LayoutGrid,
  Maximize2,
  Building2,
  MapPin,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import type { VentureData } from '../types';

interface StatsBadgesProps {
  venture: VentureData;
}

interface SpecCardProps {
  item: { value: string; label: string; sub?: string };
  idx: number;
  primaryColor: string;
}

function Interactive3DCard({ item, idx, primaryColor }: SpecCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsTapped(false);
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  // Determine icon & color based on label or index
  const getIconData = () => {
    const l = (item.label || '').toLowerCase();
    if (l.includes('acre') || l.includes('land') || l.includes('area')) {
      return { Icon: MapPin, color: '#10b981', gradient: 'from-emerald-500 to-teal-600', glow: 'rgba(16, 185, 129, 0.25)' };
    }
    if (l.includes('plot') || l.includes('unit') || l.includes('villa')) {
      return { Icon: LayoutGrid, color: '#6366f1', gradient: 'from-indigo-500 to-purple-600', glow: 'rgba(99, 102, 241, 0.25)' };
    }
    if (l.includes('sft') || l.includes('feet') || l.includes('sq') || l.includes('size')) {
      return { Icon: Maximize2, color: '#0ea5e9', gradient: 'from-sky-500 to-blue-600', glow: 'rgba(14, 165, 233, 0.25)' };
    }
    if (l.includes('tree') || l.includes('green') || l.includes('nature') || l.includes('park')) {
      return { Icon: Trees, color: '#059669', gradient: 'from-emerald-600 to-green-700', glow: 'rgba(5, 150, 105, 0.25)' };
    }
    if (l.includes('block') || l.includes('sector') || l.includes('road') || l.includes('avenue')) {
      return { Icon: Building2, color: '#f59e0b', gradient: 'from-amber-500 to-orange-600', glow: 'rgba(245, 158, 11, 0.25)' };
    }
    const fallbacks = [
      { Icon: Compass, color: '#10b981', gradient: 'from-emerald-500 to-teal-600', glow: 'rgba(16, 185, 129, 0.25)' },
      { Icon: LayoutGrid, color: '#6366f1', gradient: 'from-indigo-500 to-purple-600', glow: 'rgba(99, 102, 241, 0.25)' },
      { Icon: Maximize2, color: '#0ea5e9', gradient: 'from-sky-500 to-blue-600', glow: 'rgba(14, 165, 233, 0.25)' },
      { Icon: Trees, color: '#059669', gradient: 'from-emerald-600 to-green-700', glow: 'rgba(5, 150, 105, 0.25)' },
      { Icon: Building2, color: '#f59e0b', gradient: 'from-amber-500 to-orange-600', glow: 'rgba(245, 158, 11, 0.25)' },
    ];
    return fallbacks[idx % fallbacks.length];
  };

  const { Icon, color: iconColor, glow: iconGlow } = getIconData();
  const isFlipped = isHovered || isTapped;

  return (
    <Box
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsTapped((prev) => !prev)}
      className={isFlipped ? 'is-flipped' : ''}
      sx={{
        perspective: '1200px',
        height: { xs: 195, sm: 210, md: 220 },
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover .flip-card-inner, &.is-flipped .flip-card-inner': {
          transform: 'rotateY(180deg)',
        },
      }}
    >
      <Box
        className="flip-card-inner"
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ===================== FRONT FACE (BIG NUMBER ONLY) ===================== */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            p: 2.5,
            borderRadius: 4,
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.9)',
            boxShadow: `0 14px 30px -10px ${iconGlow}, 0 4px 12px -2px rgba(15, 23, 42, 0.05)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: iconColor,
              boxShadow: `0 20px 40px -12px ${iconGlow}, 0 8px 18px -4px rgba(15, 23, 42, 0.08)`,
            },
          }}
        >
          {/* Dynamic Specular Glare Reflection */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 65%)`,
              opacity: glare.opacity,
              transition: 'opacity 0.25s ease',
              mixBlendMode: 'overlay',
            }}
          />

          {/* Top Row: Tech Badge & Floating 3D Icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.25,
                py: 0.35,
                borderRadius: '8px',
                bgcolor: 'rgba(241, 245, 249, 0.9)',
                border: '1px solid rgba(203, 213, 225, 0.6)',
              }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: iconColor,
                  boxShadow: `0 0 8px ${iconColor}`,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  letterSpacing: '0.08em',
                  color: '#475569',
                }}
              >
                0{idx + 1}
              </Typography>
            </Box>

            {/* Glowing 3D Spec Icon Container */}
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 2.5,
                bgcolor: `${iconColor}14`,
                border: `1px solid ${iconColor}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: iconColor,
                boxShadow: `0 4px 12px ${iconGlow}`,
                transition: 'transform 0.3s ease',
              }}
            >
              <Icon size={17} strokeWidth={2.4} />
            </Box>
          </Box>

          {/* Center: MONUMENTAL 3D NUMBER ONLY */}
          <Box sx={{ my: 'auto', textAlign: 'center', zIndex: 1, py: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontFamily: 'Roboto Mono, monospace',
                letterSpacing: '-0.04em',
                fontSize: { xs: '2.5rem', sm: '2.85rem', md: '3.1rem' },
                lineHeight: 1,
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
              }}
            >
              {item.value}
            </Typography>
          </Box>

          {/* Bottom subtle accent bar (clean, no flip icon button) */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1, pb: 0.5 }}>
            <Box
              sx={{
                width: 24,
                height: 3,
                borderRadius: 2,
                bgcolor: `${iconColor}30`,
              }}
            />
          </Box>
        </Box>

        {/* ===================== BACK FACE (SPECS DETAILS) ===================== */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            p: 2.5,
            borderRadius: 4,
            background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
            border: `1.5px solid ${iconColor}80`,
            boxShadow: `0 18px 36px -10px ${iconGlow}, 0 8px 16px -4px rgba(0, 0, 0, 0.3)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: '#ffffff',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Radial Glow on Back */}
          <Box
            sx={{
              position: 'absolute',
              top: '-30%',
              right: '-30%',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${iconColor}40 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Top Row on Back: Metric Badge + Value Chip */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShieldCheck size={14} style={{ color: iconColor }} />
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  letterSpacing: '0.1em',
                  color: iconColor,
                  textTransform: 'uppercase',
                }}
              >
                Verified #0{idx + 1}
              </Typography>
            </Box>

            <Box
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: '6px',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontFamily: 'Roboto Mono, monospace',
                fontSize: '0.72rem',
                fontWeight: 900,
                color: '#ffffff',
              }}
            >
              {item.value}
            </Box>
          </Box>

          {/* Center: Title (Total Acres etc.) and Subtext Description */}
          <Box sx={{ my: 'auto', zIndex: 1, py: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.25,
                fontSize: { xs: '1.05rem', sm: '1.15rem' },
                textTransform: 'capitalize',
                letterSpacing: '-0.01em',
                mb: 0.75,
              }}
            >
              {item.label}
            </Typography>

            {item.sub ? (
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#cbd5e1',
                    display: 'block',
                    fontSize: '0.74rem',
                    lineHeight: 1.4,
                    fontWeight: 500,
                  }}
                >
                  {item.sub}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: '#94a3b8', fontSize: '0.74rem', fontWeight: 500 }}
                >
                  Official Layout Certified Specification
                </Typography>
              </Box>
            )}
          </Box>

          {/* Bottom subtle accent bar on back (clean, no flip icon button) */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1, pb: 0.5 }}>
            <Box
              sx={{
                width: 24,
                height: 3,
                borderRadius: 2,
                bgcolor: `${iconColor}40`,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function StatsBadges({ venture }: StatsBadgesProps) {
  const theme = useTheme();

  const specs = Array.isArray(venture.specs) && venture.specs.length > 0
    ? venture.specs
    : [
        { value: '180+', label: 'Villa Plots', sub: 'Approved Layout' },
        { value: '40 & 50 Ft', label: 'Internal Blacktop Avenues', sub: 'Engineered for Heavy Traffic' },
        { value: '100%', label: 'Vaastu Orientation', sub: 'East & North Facing Alignments' },
        { value: '24/7', label: 'Guarded Gated Perimeter', sub: 'Full Masonry Compound Wall' },
        { value: 'Instant', label: 'Spot Registration', sub: 'Ready for Immediate Possession' },
      ];

  return (
    <Box
      id="stats-strip"
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Architectural Grid Background Accent */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.06) 0%, transparent 60%),
            linear-gradient(rgba(226, 232, 240, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(226, 232, 240, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
          opacity: 0.65,
          pointerEvents: 'none',
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header - Prominent Heading (Defaults to Venture Snapshot or custom title from builder) */}
        <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: { xs: 4, sm: 5, md: 6 } }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontFamily: 'serif',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: '#0F172A',
            }}
          >
            {venture.specsTitle || venture.specsEyebrow || 'Venture Snapshot'}
          </Typography>
          {Boolean(venture.specsSubtitle && venture.specsSubtitle.trim()) && (
            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                mt: 1.5,
                lineHeight: 1.6,
              }}
            >
              {venture.specsSubtitle}
            </Typography>
          )}
        </Box>

        {/* 3D Interactive Cards Grid */}
        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
          {specs.map((item, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Interactive3DCard
                item={item}
                idx={idx}
                primaryColor={theme.palette.primary.main}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
