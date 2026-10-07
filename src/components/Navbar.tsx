import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { VentureData } from '../types';

interface NavbarProps {
  venture: VentureData;
}

export default function Navbar({ venture }: NavbarProps) {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Thesis', href: '#why-choose' },
    { label: 'Overview', href: '#about' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Master Plan', href: '#master-plan' },
    { label: 'Connectivity', href: '#locations' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.85)',
        boxShadow: scrolled
          ? '0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03)'
          : '0 4px 20px -4px rgba(15, 23, 42, 0.04)',
        color: '#0f172a',
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        py: scrolled ? 0.5 : 1,
      }}
    >
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Brand Logo & Title */}
          <Box
            component="a"
            href="#hero"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              sx={{
                bgcolor: '#ffffff',
                px: 1.5,
                py: 0.75,
                borderRadius: 2,
                border: '1px solid rgba(226, 232, 240, 0.9)',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <img
                src="/sln_micro_templates_logo.webp"
                alt="SLN Logo"
                style={{ height: 34, width: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  color: '#0f172a',
                }}
              >
                {venture.title}
              </Typography>
            </Box>
          </Box>

          {/* Desktop Nav Links */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              bgcolor: 'rgba(241, 245, 249, 0.85)',
              px: 1.25,
              py: 0.5,
              borderRadius: 8,
              border: '1px solid rgba(226, 232, 240, 0.95)',
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.02)',
            }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                size="small"
                sx={{
                  color: '#334155',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  px: 1.75,
                  py: 0.75,
                  borderRadius: 6,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: '#ffffff',
                    color: theme.palette.primary.main,
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Right Action CTA & Mobile Hamburger */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              variant="contained"
              color="primary"
              href="#contact"
              startIcon={<CalendarMonthIcon fontSize="small" />}
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                fontWeight: 700,
                fontSize: '0.85rem',
                borderRadius: 2.5,
                px: 2.5,
                py: 1,
                boxShadow: `0 4px 14px -2px ${theme.palette.primary.main}40`,
                transition: 'all 0.25s ease',
                '&:hover': {
                  boxShadow: `0 8px 20px -3px ${theme.palette.primary.main}60`,
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Book Site Visit
            </Button>

            {/* Mobile Hamburger Button */}
            <IconButton
              aria-label="open navigation drawer"
              edge="end"
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { md: 'none' },
                color: '#0f172a',
                bgcolor: 'rgba(241, 245, 249, 0.9)',
                border: '1px solid rgba(226, 232, 240, 0.85)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
                p: 1.1,
                '&:hover': {
                  bgcolor: '#ffffff',
                  borderColor: theme.palette.primary.light,
                },
              }}
            >
              <MenuIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 320,
            maxWidth: '85vw',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            bgcolor: '#ffffff',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          },
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <img
                src="/sln_micro_templates_logo.webp"
                alt="SLN Logo"
                style={{ height: 32, width: 'auto' }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>
                {venture.title}
              </Typography>
            </Box>
            <IconButton
              onClick={() => setMobileOpen(false)}
              size="small"
              sx={{
                bgcolor: 'rgba(241, 245, 249, 0.9)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
              }}
            >
              <CloseIcon sx={{ fontSize: 18, color: '#334155' }} />
            </IconButton>
          </Box>

          <List sx={{ pt: 1 }}>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component="a"
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderRadius: 2.5,
                    py: 1.25,
                    px: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(241, 245, 249, 0.9)',
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    slotProps={{
                      primary: {
                        sx: { fontWeight: 600, fontSize: '0.95rem', color: '#1e293b' },
                      },
                    }}
                  />
                  <ArrowForwardIosIcon sx={{ fontSize: 13, color: '#94a3b8' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ pt: 2, borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            href="#contact"
            onClick={() => setMobileOpen(false)}
            startIcon={<CalendarMonthIcon />}
            sx={{ py: 1.5, fontWeight: 700, borderRadius: 2.5 }}
          >
            Book Free Site Visit
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}
