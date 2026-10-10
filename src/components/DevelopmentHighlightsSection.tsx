import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  IconButton,
  Button,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import type { VentureData, DevelopmentHighlightItem } from '../types';

interface DevelopmentHighlightsSectionProps {
  venture: VentureData;
}

export default function DevelopmentHighlightsSection({
  venture,
}: DevelopmentHighlightsSectionProps) {
  const theme = useTheme();
  const [selectedHighlight, setSelectedHighlight] = useState<DevelopmentHighlightItem | null>(null);

  const config = venture.developmentHighlights;
  const highlights = config?.items || [];

  // Strictly only render if there are items from backend. Never render fallback data.
  if (!config || highlights.length === 0) {
    return null;
  }

  const primaryGold = '#B89358';
  const deepSlate = '#0F172A';
  const bodyText = '#475569';

  return (
    <Box
      component="section"
      id="development-highlights"
      sx={{
        py: { xs: 8, md: 11 },
        bgcolor: '#FAF9F5',
        color: deepSlate,
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(226, 232, 240, 0.8)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
      }}
    >
      {/* Daylight Atmospheric Ambient Glows & Dot Grid */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 180, 126, 0.12) 0%, rgba(250, 249, 245, 0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.07) 0%, rgba(250, 249, 245, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header - Single Big Title (Rendered ONLY if title is provided from backend) */}
        {Boolean(config.title && config.title.trim()) && (
          <Box sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto', mb: { xs: 5, md: 7 } }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2.1rem', sm: '2.75rem', md: '3.3rem' },
                fontFamily: 'serif',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: deepSlate,
              }}
            >
              {config.title}
            </Typography>
          </Box>
        )}

        {/* 3-Items per Row Gallery Grid (No Badges, Refined Proportions) */}
        <Grid
          container
          spacing={{ xs: 3, md: 3.5 }}
          sx={{
            justifyContent: highlights.length < 3 ? 'center' : 'flex-start',
            alignItems: 'stretch',
          }}
        >
          {highlights.map((item, idx) => {
            const hasImage = Boolean(item.image && item.image.trim());
            const imgSrc = hasImage ? item.image : '';

            return (
              <Grid
                key={item.id || idx}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4, // Maintains strictly 3 items a row on desktop
                }}
              >
                <Card
                  onClick={() => setSelectedHighlight(item)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '18px',
                    bgcolor: '#ffffff',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    boxShadow: '0 8px 24px -6px rgba(15, 23, 42, 0.06)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      borderColor: 'rgba(184, 147, 88, 0.4)',
                      boxShadow:
                        '0 20px 35px -10px rgba(15, 23, 42, 0.12), 0 0 20px rgba(184, 147, 88, 0.12)',
                      '& .card-img': {
                        transform: 'scale(1.06)',
                      },
                      '& .hover-zoom-icon': {
                        opacity: 1,
                        transform: 'scale(1)',
                      },
                    },
                  }}
                >
                  {/* Image Container with Moderate Height - ONLY when image is provided from backend */}
                  {hasImage && (
                    <Box
                      sx={{
                        position: 'relative',
                        height: { xs: 200, sm: 215, md: 220 },
                        overflow: 'hidden',
                        bgcolor: '#F1F5F9',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={imgSrc}
                        alt={item.title || 'Highlight'}
                        className="card-img"
                        onError={(e: any) => {
                          const target = e.currentTarget;
                          if (target) target.style.display = 'none';
                        }}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />

                      {/* Subtle lighting vignette */}
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(15,23,42,0.18) 100%)',
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Subtle Hover Zoom Button in corner */}
                      <Box
                        className="hover-zoom-icon"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 255, 255, 0.92)',
                          backdropFilter: 'blur(8px)',
                          color: deepSlate,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                          opacity: 0,
                          transform: 'scale(0.8)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <ZoomInIcon sx={{ fontSize: 18 }} />
                      </Box>
                    </Box>
                  )}

                  {/* Card Content Area */}
                  <CardContent
                    sx={{
                      p: 2.75,
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        lineHeight: 1.3,
                        color: deepSlate,
                        mb: 1.25,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: bodyText,
                        fontSize: '0.86rem',
                        lineHeight: 1.62,
                        flexGrow: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.description || item.desc}
                    </Typography>

                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Daylight Luxury Lightbox Dialog */}
      <Dialog
        open={Boolean(selectedHighlight)}
        onClose={() => setSelectedHighlight(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: '#ffffff',
              color: deepSlate,
              borderRadius: '22px',
              border: '1px solid rgba(184, 147, 88, 0.3)',
              overflow: 'hidden',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25)',
            },
          },
        }}
      >
        {selectedHighlight && (
          <Box>
            {selectedHighlight.image && selectedHighlight.image.trim() && (
              <Box sx={{ position: 'relative', height: { xs: 250, sm: 380 }, bgcolor: '#0F172A' }}>
                <img
                  src={selectedHighlight.image}
                  alt={selectedHighlight.title || 'Highlight'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            )}

            <Box sx={{ p: { xs: 3.5, sm: 4.5 } }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  fontFamily: 'serif',
                  color: deepSlate,
                  mb: 2,
                  fontSize: { xs: '1.5rem', sm: '1.9rem' },
                  lineHeight: 1.25,
                }}
              >
                {selectedHighlight.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: bodyText,
                  lineHeight: 1.85,
                  fontSize: { xs: '0.95rem', sm: '1.025rem' },
                }}
              >
                {selectedHighlight.description || selectedHighlight.desc}
              </Typography>

              <Box
                sx={{
                  mt: 4,
                  pt: 3,
                  borderTop: '1px solid rgba(226, 232, 240, 0.9)',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setSelectedHighlight(null)}
                  sx={{
                    bgcolor: deepSlate,
                    color: '#ffffff',
                    fontWeight: 700,
                    px: 3.5,
                    py: 1,
                    borderRadius: '10px',
                    '&:hover': {
                      bgcolor: primaryGold,
                    },
                  }}
                >
                  Close Showcase
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
