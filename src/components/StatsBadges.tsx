import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
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

  // Determine accent color and glow based on label or index
  const getCardTheme = () => {
    const l = (item.label || '').toLowerCase();
    if (l.includes('acre') || l.includes('land') || l.includes('area')) {
      return { color: '#10b981', glow: 'rgba(16, 185, 129, 0.25)' };
    }
    if (l.includes('plot') || l.includes('unit') || l.includes('villa')) {
      return { color: '#6366f1', glow: 'rgba(99, 102, 241, 0.25)' };
    }
    if (l.includes('sft') || l.includes('feet') || l.includes('sq') || l.includes('size')) {
      return { color: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.25)' };
    }
    if (l.includes('tree') || l.includes('green') || l.includes('nature') || l.includes('park')) {
      return { color: '#059669', glow: 'rgba(5, 150, 105, 0.25)' };
    }
    if (l.includes('block') || l.includes('sector') || l.includes('road') || l.includes('avenue')) {
      return { color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.25)' };
    }
    const fallbacks = [
      { color: '#10b981', glow: 'rgba(16, 185, 129, 0.25)' },
      { color: '#6366f1', glow: 'rgba(99, 102, 241, 0.25)' },
      { color: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.25)' },
      { color: '#059669', glow: 'rgba(5, 150, 105, 0.25)' },
      { color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.25)' },
    ];
    return fallbacks[idx % fallbacks.length];
  };

  const { color: iconColor, glow: iconGlow } = getCardTheme();
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
        {/* ===================== FRONT FACE (NUMBER & TITLE) ===================== */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            p: 3,
            borderRadius: 4,
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.9)',
            boxShadow: `0 14px 30px -10px ${iconGlow}, 0 4px 12px -2px rgba(15, 23, 42, 0.05)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
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

          {/* Center: Monumental 3D Number & Title */}
          <Box sx={{ zIndex: 1, px: 1, maxWidth: '100%' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontFamily: 'Roboto Mono, monospace',
                letterSpacing: '-0.04em',
                fontSize: { xs: '2.5rem', sm: '2.85rem', md: '3.1rem' },
                lineHeight: 1.05,
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                mb: 1.25,
              }}
            >
              {item.value}
            </Typography>

            <Typography
              sx={{
                fontWeight: 800,
                color: '#334155',
                fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1.025rem' },
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
                textTransform: 'capitalize',
              }}
            >
              {item.label}
            </Typography>
          </Box>

          {/* Bottom subtle accent bar */}
          <Box sx={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 1 }}>
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

        {/* ===================== BACK FACE (DESCRIPTION ONLY) ===================== */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            p: 3,
            borderRadius: 4,
            background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
            border: `1.5px solid ${iconColor}80`,
            boxShadow: `0 18px 36px -10px ${iconGlow}, 0 8px 16px -4px rgba(0, 0, 0, 0.3)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
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

          {/* Center: Description Only */}
          <Box sx={{ zIndex: 1, px: 1, maxWidth: '100%' }}>
            <Typography
              sx={{
                color: '#e2e8f0',
                fontSize: { xs: '0.85rem', sm: '0.925rem', md: '0.975rem' },
                lineHeight: 1.6,
                fontWeight: 500,
                letterSpacing: '0.01em',
              }}
            >
              {item.sub || 'Official Layout Certified Specification'}
            </Typography>
          </Box>

          {/* Bottom subtle accent bar on back */}
          <Box sx={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 1 }}>
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
