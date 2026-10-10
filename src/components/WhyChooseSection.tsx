import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Chip,
  useTheme,
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import type { VentureData } from '../types';

interface WhyChooseSectionProps {
  venture: VentureData;
}

export default function WhyChooseSection({ venture }: WhyChooseSectionProps) {
  const theme = useTheme();

  const pillars = Array.isArray(venture.whyChoosePoints) && venture.whyChoosePoints.length > 0
    ? venture.whyChoosePoints
    : [
        {
          tag: 'Strategic Nexus',
          title: 'Prime Growth Corridor',
          description: 'Positioned signal-free along major expressways, placing employment hubs and rapid transit corridors within easy access.',
          icon: 'Compass',
        },
        {
          tag: 'Capital Appreciation',
          title: 'High-Yield Investment Potential',
          description: 'Surrounded by rapidly developing commercial and residential infrastructure, driving consistent long-term land appreciation.',
          icon: 'TrendingUp',
        },
        {
          tag: 'Legal Integrity',
          title: '100% Clear Title & Spot Registry',
          description: 'Complete statutory and legal certainty with approved layout certification, verified freehold deeds, and immediate registration.',
          icon: 'ShieldCheck',
        },
      ];

  const getPillarIcon = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('location') || t.includes('nexus')) {
      return <ExploreIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />;
    }
    if (t.includes('appreciation') || t.includes('growth')) {
      return <TrendingUpIcon sx={{ color: '#0284c7', fontSize: 28 }} />;
    }
    return <VerifiedUserIcon sx={{ color: '#d97706', fontSize: 28 }} />;
  };

  return (
    <Box
      id="why-choose"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: '#fafaf9',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
      }}
    >
      <Container>
        {/* Section Header */}
        <Box sx={{ maxWidth: 760, mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.85rem', sm: '2.5rem', lg: '3rem' },
              fontWeight: 900,
              letterSpacing: '-0.025em',
              color: '#0f172a',
              lineHeight: 1.15,
            }}
          >
            {venture.whyChooseTitle || 'An Unrivalled Convergence of Connectivity, Economy & Legal Security'}
          </Typography>

          {venture.whyChooseSubtitle && (
            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                mt: 2,
                lineHeight: 1.6,
              }}
            >
              {venture.whyChooseSubtitle}
            </Typography>
          )}
        </Box>

        {/* Pillars Grid - Parallelogram Styled Cards */}
        <Grid container spacing={{ xs: 3, md: 3.5 }} sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          {pillars.map((pillar, idx) => (
            <Grid key={idx} size={{ xs: 12, md: 4 }} sx={{ overflow: 'visible' }}>
              <Paper
                elevation={0}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  borderRadius: { xs: '14px', md: '16px' },
                  bgcolor: '#ffffff',
                  border: '1.5px solid rgba(226, 232, 240, 0.95)',
                  transform: { xs: 'skewX(-3deg)', sm: 'skewX(-4deg)', md: 'skewX(-5.5deg)' },
                  transformOrigin: 'center center',
                  willChange: 'transform, box-shadow',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'subpixel-antialiased',
                  transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.45s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.35s ease',
                  boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: '0 20px 36px -8px rgba(15, 23, 42, 0.1), 0 8px 16px -4px rgba(15, 23, 42, 0.04)',
                    transform: {
                      xs: 'translateY(-5px) skewX(-3deg)',
                      sm: 'translateY(-6px) skewX(-4deg)',
                      md: 'translateY(-6px) skewX(-5.5deg)',
                    },
                    '& .pillar-title': {
                      color: theme.palette.primary.main,
                    },
                    '& .pillar-top-accent': {
                      opacity: 1,
                      transform: 'scaleX(1)',
                    },
                    '& .pillar-icon-box': {
                      borderColor: theme.palette.primary.light,
                      bgcolor: '#f8fafc',
                      transform: 'translateY(-2px)',
                    },
                  },
                }}
              >
                {/* Parallelogram Top Accent Line - perfectly bounded */}
                <Box
                  className="pillar-top-accent"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main || '#38bdf8'})`,
                    transformOrigin: 'left center',
                    transform: 'scaleX(0.22)',
                    transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease',
                    opacity: 0.7,
                    zIndex: 2,
                  }}
                />

                {/* Counter-skewed Content Wrapper */}
                <Box
                  sx={{
                    transform: { xs: 'skewX(3deg)', sm: 'skewX(4deg)', md: 'skewX(5.5deg)' },
                    transformOrigin: 'center center',
                    p: { xs: 3.5, sm: 4 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box
                      className="pillar-icon-box"
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 3,
                        bgcolor: 'rgba(241, 245, 249, 0.9)',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.35s ease, border-color 0.35s ease',
                      }}
                    >
                      {getPillarIcon(pillar.tag)}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'Roboto Mono, monospace',
                        fontWeight: 800,
                        color: '#94a3b8',
                        fontSize: '0.875rem',
                        letterSpacing: '0.05em',
                      }}
                    >
                      0{idx + 1}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={pillar.tag}
                      size="small"
                      sx={{
                        fontFamily: 'Roboto Mono, monospace',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        bgcolor: 'rgba(241, 245, 249, 0.85)',
                        color: '#475569',
                        border: '1px solid rgba(203, 213, 225, 0.65)',
                        mb: 1.5,
                      }}
                    />
                    <Typography
                      className="pillar-title"
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: '#0f172a',
                        fontSize: '1.25rem',
                        lineHeight: 1.25,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {pillar.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748b',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      flexGrow: 1,
                    }}
                  >
                    {pillar.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
