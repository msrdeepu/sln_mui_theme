import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Link,
  useTheme,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import type { VentureData } from '../types';

interface FooterSectionProps {
  venture: VentureData;
}

export default function FooterSection({ venture }: FooterSectionProps) {
  const theme = useTheme();

  const topMenuItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Thesis', href: '#why-choose' },
    { label: 'Overview', href: '#about' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Master Plan', href: '#master-plan' },
    { label: 'Connectivity', href: '#locations' },
    { label: 'Site Visit', href: '#contact' },
  ];

  const phone = venture.contact?.phone;

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#090d16',
        color: '#ffffff',
        pt: 8,
        pb: 5,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 5, lg: 8 }} sx={{ pb: 6, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          {/* Column 1: Brand & Overview */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: '#ffffff',
                px: 2,
                py: 1,
                borderRadius: 2,
                mb: 2.5,
              }}
            >
              <img
                src="/sln_micro_templates_logo.webp"
                alt="SLNMPL Logo"
                style={{ height: 32, width: 'auto', display: 'block' }}
              />
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: '#94a3b8',
                lineHeight: 1.65,
                maxWidth: 420,
              }}
            >
              {venture.title} — Ultra-modern master-planned plotted community engineered for sustained capital appreciation and immediate spot registration.
            </Typography>
          </Grid>

          {/* Column 2: Navigation Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'Roboto Mono, monospace',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: theme.palette.primary.light,
                display: 'block',
                mb: 2,
              }}
            >
              Site Navigation
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {topMenuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  underline="none"
                  sx={{
                    color: '#cbd5e1',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                    '&:hover': { color: theme.palette.primary.light },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Column 3: Site Office Lounge */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: theme.palette.primary.light,
                  display: 'block',
                  mb: 1,
                }}
              >
                On-Site Experience Lounge
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#ffffff' }}>
                {venture.contact?.loungeTitle || 'Site Office & Experience Center'}
              </Typography>

              <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mt: 0.5, lineHeight: 1.5 }}>
                {venture.contact?.branchAddress || 'Highway Site Office, Tada-Sri City Bypass Road, Tada, Andhra Pradesh 524401.'}
              </Typography>

              {Boolean(phone && phone.trim()) && (
                <Box sx={{ pt: 2, mt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1.5,
                        bgcolor: `${theme.palette.primary.main}25`,
                        color: theme.palette.primary.light,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        shrink: 0,
                      }}
                    >
                      <PhoneIcon sx={{ fontSize: 16 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.65rem', display: 'block', textTransform: 'uppercase' }}>
                        Direct Sales Line
                      </Typography>
                      <Typography
                        component="a"
                        href={`tel:${phone}`}
                        sx={{
                          color: '#ffffff',
                          fontFamily: 'Roboto Mono, monospace',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          '&:hover': { color: theme.palette.primary.light },
                        }}
                      >
                        {phone}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Bottom Bar: Copyright & Back to Top */}
        <Box sx={{ pt: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            © {new Date().getFullYear()} SLN Marketing Private Limited (SLNMPL). All Rights Reserved.
          </Typography>

          <Link
            href="#hero"
            underline="none"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              color: '#94a3b8',
              fontSize: '0.8rem',
              fontWeight: 600,
              transition: 'color 0.2s ease',
              '&:hover': { color: theme.palette.primary.light },
            }}
          >
            <span>Back to Top</span>
            <ArrowUpwardIcon sx={{ fontSize: 14 }} />
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
