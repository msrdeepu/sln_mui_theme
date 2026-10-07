import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';
import GppGoodIcon from '@mui/icons-material/GppGood';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import type { VentureData } from '../types';

interface AboutSectionProps {
  venture: VentureData;
}

export default function AboutSection({ venture }: AboutSectionProps) {
  const theme = useTheme();

  const checklist = Array.isArray(venture.aboutChecklist) && venture.aboutChecklist.length > 0
    ? venture.aboutChecklist
    : [
        '100% Approved Layout with immediate spot registration',
        'Direct frontage onto primary 6-lane national transit artery',
        'Concealed electrical lines and storm-water drainage architecture',
        'Pre-approved mortgage sanctioning with top-tier commercial banks',
        'Vaastu-compliant layout orientations tailored for natural ventilation',
      ];

  // Helper to split title for modern 2-tone emphasis if appropriate
  const renderTitle = (titleStr: string) => {
    const defaultTitle = 'A Master-Planned Enclave Conceived for Elevated Living';
    const text = titleStr || defaultTitle;
    const words = text.split(' ');
    if (words.length > 3) {
      const mainPart = words.slice(0, words.length - 2).join(' ');
      const accentPart = words.slice(words.length - 2).join(' ');
      return (
        <>
          {mainPart}{' '}
          <Box
            component="span"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #0284c7 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline',
            }}
          >
            {accentPart}
          </Box>
        </>
      );
    }
    return text;
  };

  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
      }}
    >
      {/* Subtle Background Accent Mesh Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(2, 132, 199, 0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, lg: 8 }} sx={{ alignItems: 'center' }}>
          {/* Left Column: Narrative & Overview */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Box sx={{ mb: 3 }}>
              {/* Modern Live Pill Eyebrow */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.25,
                  px: 2,
                  py: 0.75,
                  borderRadius: '9999px',
                  bgcolor: 'rgba(241, 245, 249, 0.9)',
                  border: '1px solid rgba(203, 213, 225, 0.7)',
                  mb: 2.5,
                  boxShadow: '0 2px 6px -1px rgba(0, 0, 0, 0.03)',
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.main,
                    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#334155',
                  }}
                >
                  {venture.aboutEyebrow || 'Development Architecture'}
                </Typography>
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.65rem', lg: '3.15rem' },
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: '#0f172a',
                  lineHeight: 1.14,
                  mb: 3,
                }}
              >
                {renderTitle(venture.aboutTitle || '')}
              </Typography>
            </Box>

            {/* Editorial Overview Narrative */}
            <Stack spacing={2} sx={{ mb: 4 }}>
              {venture.overviewText.map((p, idx) => (
                <Typography
                  key={idx}
                  variant="body1"
                  sx={{
                    color: idx === 0 ? '#334155' : '#64748b',
                    fontSize: idx === 0 ? { xs: '1rem', sm: '1.075rem' } : { xs: '0.95rem', sm: '1rem' },
                    fontWeight: idx === 0 ? 500 : 400,
                    lineHeight: 1.7,
                  }}
                >
                  {p}
                </Typography>
              ))}
            </Stack>

            {/* Executive Quote Card - Glassmorphic Architectural Style */}
            {venture.aboutQuote && (
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, sm: 3.5 },
                  mb: 4,
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
                  border: '1.5px solid rgba(226, 232, 240, 0.95)',
                  boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.35s ease',
                  '&:hover': {
                    borderColor: theme.palette.primary.light,
                    boxShadow: '0 16px 36px -10px rgba(15, 23, 42, 0.08)',
                  },
                }}
              >
                {/* Accent Corner Indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 24,
                    width: 48,
                    height: 3,
                    borderRadius: '0 0 4px 4px',
                    bgcolor: theme.palette.primary.main,
                  }}
                />

                <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: '12px',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      shrink: 0,
                      mt: 0.25,
                    }}
                  >
                    <FormatQuoteIcon sx={{ fontSize: 24, transform: 'rotate(180deg)' }} />
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        fontStyle: 'italic',
                        color: '#1e293b',
                        lineHeight: 1.65,
                        fontSize: { xs: '0.925rem', sm: '0.975rem' },
                        mb: 1.5,
                      }}
                    >
                      "{venture.aboutQuote}"
                    </Typography>

                    {venture.aboutQuoteAuthor && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 16, height: 1.5, bgcolor: theme.palette.primary.main }} />
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: 'Roboto Mono, monospace',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: theme.palette.primary.main,
                          }}
                        >
                          {venture.aboutQuoteAuthor}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            )}

            {/* Development Hallmarks - Modern Spec Cards */}
            <Box sx={{ pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.25 }}>
                <DomainAddIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#64748b',
                    fontSize: '0.775rem',
                  }}
                >
                  Development Hallmarks
                </Typography>
              </Box>

              <Grid container spacing={1.5}>
                {checklist.map((item, idx) => (
                  <Grid key={idx} size={{ xs: 12, sm: 6 }}>
                    <Box
                      sx={{
                        p: 1.75,
                        borderRadius: '10px',
                        bgcolor: 'rgba(248, 250, 252, 0.75)',
                        border: '1px solid rgba(226, 232, 240, 0.85)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.25,
                        height: '100%',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          bgcolor: '#ffffff',
                          borderColor: theme.palette.primary.light,
                          boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.04)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <CheckCircleIcon
                        sx={{
                          fontSize: 18,
                          color: theme.palette.primary.main,
                          mt: '2px',
                          shrink: 0,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: '#334155',
                          lineHeight: 1.45,
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Right Column: Architectural Visual Frame */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box sx={{ position: 'relative' }}>
              {/* Outer Decorative Ambient Glow */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: '-12px',
                  borderRadius: '28px',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, transparent 65%)`,
                  filter: 'blur(16px)',
                  opacity: 0.7,
                  zIndex: 0,
                }}
              />

              {/* Main Visual Showcase Frame */}
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(226, 232, 240, 0.8)',
                  zIndex: 1,
                  bgcolor: '#0f172a',
                  '&:hover img': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {/* Architectural Photo */}
                <Box
                  component="img"
                  src={venture.aboutImage}
                  alt={venture.title}
                  sx={{
                    width: '100%',
                    aspectRatio: { xs: '4 / 3.5', sm: '4 / 5' },
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Subtle Cinematic Vignette */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.1) 45%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Top Floating Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.75,
                    py: 0.75,
                    borderRadius: '9999px',
                    bgcolor: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <GppGoodIcon sx={{ fontSize: 16, color: '#38bdf8' }} />
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: 'Roboto Mono, monospace',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    100% Approved Layout
                  </Typography>
                </Box>

                {/* Floating Glassmorphic Master Layout Card */}
                <Paper
                  elevation={0}
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    p: 2.25,
                    borderRadius: '16px',
                    bgcolor: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 20px 35px -8px rgba(0, 0, 0, 0.2), 0 8px 16px -4px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, #0284c7)`,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 16px -4px ${alpha(theme.palette.primary.main, 0.4)}`,
                      shrink: 0,
                    }}
                  >
                    <VerifiedIcon sx={{ fontSize: 24 }} />
                  </Box>

                  <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981' }} />
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: 'Roboto Mono, monospace',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: theme.palette.primary.main,
                          fontSize: '0.72rem',
                          lineHeight: 1,
                        }}
                      >
                        Certified Master Layout
                      </Typography>
                    </Box>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 800,
                        color: '#0f172a',
                        fontSize: '0.925rem',
                        lineHeight: 1.3,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {venture.title} • {venture.location}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
