import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import confetti from 'canvas-confetti';
import type { VentureData } from '../types';
import { getLocationAssetUrl } from '../siteConfig';

interface BrochureBannerProps {
  venture: VentureData;
}

export default function BrochureBanner({ venture }: BrochureBannerProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const title = (venture.brochureTitle || 'Farmland Near Hyderabad With Easy Access')
    .replace(/\bDTCP\s*(&\s*)?/gi, '')
    .trim();

  const desc = (
    venture.brochureDesc ||
    'Sahaja Nature Lake is at Aroor, Sadashivpet, approximately 5 km off Mumbai Highway.'
  )
    .replace(/\bDTCP\s*(&\s*)?/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const cardTitle = venture.brochureCardTitle || 'PROJECT LOCATION';
  const btnText = venture.brochureBtnText || 'Get Route & Site Visit Details';

  // Dynamic label-value pairs editable from backend
  const items = Array.isArray(venture.brochureItems) && venture.brochureItems.length > 0
    ? venture.brochureItems
    : [
        { label: 'Project', value: venture.title || 'Sahaja Nature Lake' },
        { label: 'Location', value: venture.location || 'Aroor, Sadashivpet' },
        { label: 'Highway', value: '5 km off Mumbai Highway' },
        { label: 'Road', value: 'Mominpet–Budhera Road' },
      ];

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

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const pdfUrl = getResolvedPdfUrl();
      const fileName = venture.brochureFileName || `${venture.slug || 'venture'}-brochure.pdf`;

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
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
      });

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('[BrochureBanner] Download error:', err);
      const fallbackUrl = 'https://cms.slnmplapp.com/core/public/uploads/venture_pages/brochure/sln-arjun-ventures_1790316373_IuAvac.pdf';
      window.open(fallbackUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const brochureImage =
    venture.brochureMockup ||
    venture.heroBanner ||
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80';

  return (
    <Box
      id="brochure"
      component="section"
      sx={{
        py: { xs: 3, sm: 3.5, md: 4 },
        bgcolor: '#FAF8F5', // warm, elegant luxury cream background
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1140, px: { xs: 2, sm: 3 } }}>
        {/* ===================== COMPACT TOP HEADER ===================== */}
        <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 2.5 } }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", "Cinzel", "Georgia", serif',
              fontWeight: 800,
              fontSize: { xs: '1.4rem', sm: '1.75rem', md: '2.05rem' },
              letterSpacing: '-0.02em',
              color: '#132a21',
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontFamily: 'inherit',
              color: '#556960',
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              lineHeight: 1.45,
              maxWidth: 680,
              mx: 'auto',
              fontWeight: 400,
            }}
          >
            {desc}
          </Typography>
        </Box>

        {/* ===================== 2-COLUMN GRID (COMPACT CARD + IMAGE) ===================== */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '0.92fr 1.08fr',
            },
            gap: { xs: 2.5, md: 3 },
            alignItems: 'stretch',
            maxHeight: { md: 410 },
          }}
        >
          {/* LEFT: Specification / Location Floating Card */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: '#ffffff',
              borderRadius: '16px',
              p: { xs: 2.5, sm: 3 },
              boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.05), 0 2px 6px -2px rgba(0, 0, 0, 0.03)',
              border: '1px solid rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              {/* Card Header Title with Pin Icon */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box
                  component="span"
                  sx={{
                    fontSize: '1.15rem',
                    lineHeight: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  📍
                </Box>
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", "Cinzel", "Georgia", serif',
                    fontWeight: 800,
                    fontSize: { xs: '0.95rem', sm: '1.05rem' },
                    letterSpacing: '0.04em',
                    color: '#132a21',
                    textTransform: 'uppercase',
                  }}
                >
                  {cardTitle}
                </Typography>
              </Box>

              {/* Dynamic Key-Value Rows with Dividers */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {items.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      py: 1.1,
                      borderTop: idx === 0 ? '1px solid rgba(226, 232, 240, 0.75)' : undefined,
                      borderBottom: '1px solid rgba(226, 232, 240, 0.75)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.825rem',
                        fontWeight: 700,
                        color: '#1e293b',
                        mb: 0.15,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.label}{!item.label.endsWith(':') ? ':' : ''}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        color: '#475569',
                        fontWeight: 500,
                        lineHeight: 1.35,
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Dark Forest Green Action Button with Animated Download Icon */}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                size="medium"
                disabled={isDownloading}
                onClick={handleDownload}
                startIcon={
                  isDownloading ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : downloadSuccess ? (
                    <CheckCircleIcon sx={{ fontSize: '1.2rem !important' }} />
                  ) : (
                    <DownloadIcon
                      className="download-btn-icon"
                      sx={{
                        fontSize: '1.25rem !important',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  )
                }
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  py: 1.2,
                  px: 3.2,
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '0.015em',
                  bgcolor: '#133e2b',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(19, 62, 43, 0.28)',
                  textTransform: 'none',
                  width: { xs: '100%', sm: 'auto' },
                  animation: 'pulseGlow 2.8s infinite ease-in-out',
                  '@keyframes pulseGlow': {
                    '0%, 100%': {
                      boxShadow: '0 4px 14px rgba(19, 62, 43, 0.25)',
                    },
                    '50%': {
                      boxShadow: '0 6px 20px rgba(19, 62, 43, 0.42)',
                    },
                  },
                  '@keyframes downloadBounce': {
                    '0%, 100%': {
                      transform: 'translateY(0)',
                    },
                    '50%': {
                      transform: 'translateY(3px)',
                    },
                  },
                  '@keyframes shimmerSlide': {
                    '0%': {
                      transform: 'translateX(-130%)',
                    },
                    '40%, 100%': {
                      transform: 'translateX(220%)',
                    },
                  },
                  '& .download-btn-icon': {
                    animation: 'downloadBounce 1.4s infinite ease-in-out',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '60%',
                    height: '100%',
                    background:
                      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), transparent)',
                    transform: 'skewX(-25deg)',
                    animation: 'shimmerSlide 3.5s infinite ease-in-out',
                    pointerEvents: 'none',
                  },
                  '&:hover': {
                    bgcolor: '#0d2d1f',
                    boxShadow: '0 8px 22px rgba(19, 62, 43, 0.4)',
                    transform: 'translateY(-2px)',
                    '& .download-btn-icon': {
                      animation: 'downloadBounce 0.7s infinite ease-in-out',
                    },
                  },
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {isDownloading
                  ? 'Downloading...'
                  : downloadSuccess
                  ? 'Downloaded!'
                  : btnText}
              </Button>
            </Box>
          </Paper>

          {/* RIGHT: Project Landscape / Blueprint Preview Graphic */}
          <Box
            onClick={handleDownload}
            sx={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              height: { xs: 260, sm: 320, md: '100%' },
              maxHeight: { md: 410 },
              bgcolor: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={brochureImage}
              alt={`${venture.title} Official Brochure & Location`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                transition: 'transform 0.4s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
