import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Chip,
  CircularProgress,
  useTheme,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import confetti from 'canvas-confetti';
import type { VentureData } from '../types';
import { getLocationAssetUrl } from '../siteConfig';

interface BrochureBannerProps {
  venture: VentureData;
}

export default function BrochureBanner({ venture }: BrochureBannerProps) {
  const theme = useTheme();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const title = (venture.brochureTitle || 'Download Official Brochure & Layout Plan')
    .replace(/\bDTCP\s*(&\s*)?/gi, '')
    .trim();

  const desc = (
    venture.brochureDesc ||
    'Download the approved layout plan, master plan, and complete venture details.'
  )
    .replace(/\bDTCP\s*(&\s*)?/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

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

  // Direct download on click: NO details/dialog asked, uses real API PDF
  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const pdfUrl = getResolvedPdfUrl();
      const fileName = venture.brochureFileName || 'SLN_Arjun_Ventures.pdf';

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
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('[BrochureBanner] Direct download error:', err);
      const fallbackUrl = 'https://cms.slnmplapp.com/core/public/uploads/venture_pages/brochure/sln-arjun-ventures_1790316373_IuAvac.pdf';
      window.open(fallbackUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const brochureImage = venture.brochureMockup || venture.heroBanner;

  return (
    <Box
      id="brochure"
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: '#ffffff',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1420, px: { xs: 2, sm: 3, md: 4 } }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: '20px', md: '28px' },
            background: '#ffffff',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            overflow: 'hidden',
            boxShadow: '0 20px 45px -15px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: brochureImage ? '0.82fr 1.18fr' : '1fr',
                lg: brochureImage ? '0.78fr 1.22fr' : '1fr',
              },
              alignItems: 'stretch',
              minHeight: { md: 380, lg: 420 },
            }}
          >
            {/* Left Column: Text & Direct Download Action */}
            <Box
              sx={{
                p: { xs: 3.5, sm: 4.5, md: 5, lg: 6 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.6) 0%, #ffffff 50%, rgba(248, 250, 252, 0.8) 100%)',
              }}
            >
              <Chip
                label="Official Project Brochure"
                size="small"
                sx={{
                  alignSelf: 'flex-start',
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  mb: 2,
                  bgcolor: '#ffffff',
                  color: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.light}`,
                }}
              />

              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.85rem', md: '1.95rem', lg: '2.15rem' },
                  fontWeight: 900,
                  letterSpacing: '-0.025em',
                  color: '#0f172a',
                  lineHeight: 1.25,
                  mb: 1.5,
                }}
              >
                {title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#64748b',
                  fontSize: { xs: '0.875rem', sm: '0.95rem' },
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                {desc}
              </Typography>

              {/* Spacious Direct Download Button */}
              <Box sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  size="large"
                  disabled={isDownloading}
                  startIcon={
                    isDownloading ? (
                      <CircularProgress size={22} color="inherit" />
                    ) : downloadSuccess ? (
                      <CheckCircleIcon sx={{ fontSize: '1.3rem !important' }} />
                    ) : (
                      <DownloadIcon sx={{ fontSize: '1.3rem !important' }} />
                    )
                  }
                  onClick={handleDownload}
                  sx={{
                    py: 2,
                    px: { xs: 4, sm: 5.5 },
                    minWidth: { xs: '100%', sm: 250 },
                    borderRadius: '14px',
                    fontWeight: 800,
                    fontSize: '1.025rem',
                    letterSpacing: '-0.01em',
                    bgcolor: '#0f172a',
                    color: '#ffffff',
                    boxShadow: '0 12px 28px -4px rgba(15, 23, 42, 0.28)',
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      bgcolor: '#1e293b',
                      boxShadow: '0 20px 32px -6px rgba(15, 23, 42, 0.38)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.25s ease',
                  }}
                >
                  {isDownloading
                    ? 'Downloading...'
                    : downloadSuccess
                    ? 'Downloaded Successfully!'
                    : 'Download Brochure'}
                </Button>
              </Box>
            </Box>

            {/* Right Column: Expanded image container anchored to left-center */}
            {brochureImage && (
              <Box
                onClick={handleDownload}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: 260, sm: 340, md: '100%' },
                  minHeight: { md: 380, lg: 420 },
                  overflow: 'hidden',
                  bgcolor: '#0f172a',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderLeft: { md: '1px solid rgba(226, 232, 240, 0.8)' },
                }}
              >
                <Box
                  component="img"
                  src={brochureImage}
                  alt={`${venture.title} Official Brochure`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: { xs: 'center', md: 'left center' },
                    display: 'block',
                    transition: 'transform 0.4s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                />

                {/* Subtle Interactive Floating Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 14,
                    right: 14,
                    px: 1.75,
                    py: 0.75,
                    borderRadius: '100px',
                    bgcolor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'center',
                    gap: 1,
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontFamily: 'Roboto Mono, monospace',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    pointerEvents: 'none',
                  }}
                >
                  <DownloadIcon sx={{ fontSize: '0.95rem', color: '#38bdf8' }} />
                  <span>Click To Download PDF</span>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
