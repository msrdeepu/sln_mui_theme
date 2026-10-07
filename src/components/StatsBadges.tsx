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
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import type { VentureData } from '../types';

interface StatsBadgesProps {
  venture: VentureData;
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
        py: 6,
        bgcolor: '#ffffff',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
      }}
    >
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3.5, flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'Roboto Mono, monospace',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'text.secondary',
              }}
            >
              Verified Layout Specifications
            </Typography>
          </Box>
          <Chip
            label={`${venture.title} Key Parameters`}
            size="small"
            variant="outlined"
            sx={{
              fontFamily: 'Roboto Mono, monospace',
              fontSize: '0.7rem',
              fontWeight: 600,
              bgcolor: 'rgba(248, 250, 252, 0.8)',
              borderColor: 'rgba(203, 213, 225, 0.8)',
            }}
          />
        </Box>

        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
          {specs.map((item, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 6, md: 2.4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: { xs: 3, sm: 3.5 },
                  bgcolor: 'rgba(248, 250, 252, 0.85)',
                  border: '1px solid rgba(226, 232, 240, 0.95)',
                  transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  boxShadow: '0 2px 6px -1px rgba(0, 0, 0, 0.02)',
                  '&:hover': {
                    bgcolor: '#ffffff',
                    borderColor: theme.palette.primary.main,
                    boxShadow: '0 12px 28px -6px rgba(15, 23, 42, 0.08), 0 4px 8px -4px rgba(15, 23, 42, 0.04)',
                    transform: 'translateY(-2px)',
                    '& .stat-value': {
                      color: theme.palette.primary.main,
                    },
                    '& .stat-dot': {
                      bgcolor: theme.palette.primary.main,
                      transform: 'scale(1.3)',
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'row', md: 'column' },
                    alignItems: { xs: 'center', md: 'stretch' },
                    justifyContent: 'space-between',
                    gap: { xs: 2, md: 1.5 },
                    height: '100%',
                  }}
                >
                  {/* Left Column on Mobile: Index, Label, Subtext */}
                  <Box sx={{ flex: 1, minWidth: 0, order: { xs: 1, md: 2 } }}>
                    {/* Index on Desktop */}
                    <Box
                      sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: 'Roboto Mono, monospace',
                          fontWeight: 700,
                          color: '#94a3b8',
                          fontSize: '0.75rem',
                        }}
                      >
                        0{idx + 1}
                      </Typography>
                      <Box
                        className="stat-dot"
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: 'rgba(148, 163, 184, 0.5)',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </Box>

                    {/* Index Tag on Mobile */}
                    <Box
                      sx={{
                        display: { xs: 'inline-flex', md: 'none' },
                        alignItems: 'center',
                        gap: 0.75,
                        mb: 0.75,
                        px: 1,
                        py: 0.2,
                        borderRadius: '6px',
                        bgcolor: 'rgba(241, 245, 249, 0.9)',
                        border: '1px solid rgba(226, 232, 240, 0.9)',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: 'Roboto Mono, monospace',
                          fontWeight: 800,
                          color: theme.palette.primary.main,
                          fontSize: '0.7rem',
                        }}
                      >
                        0{idx + 1}
                      </Typography>
                    </Box>

                    {/* Value on Desktop */}
                    <Typography
                      className="stat-value"
                      variant="h4"
                      sx={{
                        display: { xs: 'none', md: 'block' },
                        fontWeight: 800,
                        fontFamily: 'Roboto Mono, monospace',
                        letterSpacing: '-0.03em',
                        color: '#0f172a',
                        fontSize: { xs: '1.5rem', sm: '1.85rem' },
                        lineHeight: 1.1,
                        transition: 'color 0.3s ease',
                        mb: 1,
                      }}
                    >
                      {item.value}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 800,
                        color: '#0f172a',
                        lineHeight: 1.25,
                        fontSize: { xs: '0.95rem', md: '0.875rem' },
                      }}
                    >
                      {item.label}
                    </Typography>

                    {item.sub && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#64748b',
                          display: 'block',
                          mt: 0.5,
                          fontSize: { xs: '0.775rem', md: '0.75rem' },
                          lineHeight: 1.35,
                        }}
                      >
                        {item.sub}
                      </Typography>
                    )}
                  </Box>

                  {/* Right Column on Mobile: Big Digits + Status Dot */}
                  <Box
                    sx={{
                      display: { xs: 'flex', md: 'none' },
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      textAlign: 'right',
                      shrink: 0,
                      pl: 1.5,
                      order: { xs: 2, md: 1 },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Box
                        className="stat-dot"
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: 'rgba(148, 163, 184, 0.5)',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </Box>
                    <Typography
                      className="stat-value"
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        fontFamily: 'Roboto Mono, monospace',
                        letterSpacing: '-0.04em',
                        color: '#0f172a',
                        fontSize: { xs: '1.95rem', sm: '2.25rem' },
                        lineHeight: 1,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
