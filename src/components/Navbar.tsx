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
  Chip,
  Tooltip,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import {
  Home,
  Sparkles,
  BarChart3,
  Compass,
  TreePine,
  Palmtree,
  Layers,
  Navigation,
  FileText,
  HelpCircle,
  CalendarCheck,
} from 'lucide-react';
import type { VentureData } from '../types';

interface NavbarProps {
  venture: VentureData;
}

export default function Navbar({ venture }: NavbarProps) {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 11 sections for side drawer
  const fullDrawerLinks = [
    {
      label: 'Home',
      href: '#hero',
      icon: Home,
    },
    {
      label: 'Development Highlights',
      href: '#development-highlights',
      icon: Sparkles,
    },
    {
      label: 'Venture Snapshot',
      href: '#stats-strip',
      icon: BarChart3,
    },
    {
      label: 'Why This Location',
      href: '#why-choose',
      icon: Compass,
    },
    {
      label: 'Lifestyle & Master Planning',
      href: '#about',
      icon: TreePine,
    },
    {
      label: 'Infrastructure & Amenities',
      href: '#amenities',
      icon: Palmtree,
    },
    {
      label: 'Interactive Layout',
      href: '#master-plan',
      icon: Layers,
    },
    {
      label: 'Regional Connectivity',
      href: '#locations',
      icon: Navigation,
    },
    {
      label: 'Project Brochure',
      href: '#brochure',
      icon: FileText,
    },
    {
      label: 'FAQs',
      href: '#faqs',
      icon: HelpCircle,
    },
    {
      label: 'Site Visit Booking',
      href: '#contact',
      icon: CalendarCheck,
    },
  ];

  const handleNavClick = (href: string) => {
    setDrawerOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      window.location.hash = href;
    }
  };

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
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
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

          {/* Right Action CTA & Hamburger Menu Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Button
              variant="contained"
              color="primary"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              startIcon={<CalendarMonthIcon fontSize="small" />}
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                fontWeight: 700,
                fontSize: '0.85rem',
                borderRadius: 2.5,
                px: 2.25,
                py: 1,
                boxShadow: `0 4px 14px -2px ${theme.palette.primary.main}40`,
                transition: 'all 0.25s ease',
                '&:hover': {
                  boxShadow: `0 8px 20px -3px ${theme.palette.primary.main}60`,
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Free Site Visit
            </Button>

            {/* Hamburger Button: Opens Side Drawer */}
            <Tooltip title="Navigation Menu" arrow>
              <IconButton
                aria-label="open full navigation drawer"
                onClick={() => setDrawerOpen(true)}
                sx={{
                  display: 'inline-flex',
                  color: '#0f172a',
                  bgcolor: 'rgba(241, 245, 249, 0.95)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  borderRadius: 2.5,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  p: 1.05,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    bgcolor: '#ffffff',
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                  },
                }}
              >
                <MenuIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>

      {/* Side Navigation Drawer (Full 11-section Index) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          zIndex: 1400,
          '& .MuiDrawer-paper': {
            width: { xs: '88vw', sm: 380, md: 400 },
            maxWidth: '420px',
            bgcolor: '#ffffff',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            p: 2.5,
            borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
            bgcolor: '#FAF8F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                bgcolor: '#ffffff',
                p: 0.75,
                borderRadius: 2,
                border: '1px solid rgba(226, 232, 240, 0.9)',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              }}
            >
              <img
                src="/sln_micro_templates_logo.webp"
                alt="SLN Logo"
                style={{ height: 28, width: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.2,
                fontSize: '1rem',
                letterSpacing: '-0.01em',
              }}
            >
              {venture.title}
            </Typography>
          </Box>

          <IconButton
            onClick={() => setDrawerOpen(false)}
            size="small"
            aria-label="close navigation drawer"
            sx={{
              bgcolor: '#ffffff',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              color: '#334155',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: '#fee2e2',
                color: '#dc2626',
                borderColor: '#fca5a5',
                transform: 'rotate(90deg)',
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Category Pill Subheader */}
        <Box
          sx={{
            px: 2.5,
            py: 1.25,
            bgcolor: '#ffffff',
            borderBottom: '1px solid rgba(241, 245, 249, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#94a3b8',
            }}
          >
            Navigation Index
          </Typography>
          <Chip
            label="Click to Jump"
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 700,
              bgcolor: 'rgba(16, 185, 129, 0.08)',
              color: '#059669',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          />
        </Box>

        {/* Scrollable 11 Sections List */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 1.75,
            '&::-webkit-scrollbar': {
              width: 5,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'rgba(203, 213, 225, 0.6)',
              borderRadius: 3,
            },
          }}
        >
          <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {fullDrawerLinks.map((item) => {
              const IconComponent = item.icon;
              return (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavClick(item.href)}
                    sx={{
                      borderRadius: 2.5,
                      py: 1.2,
                      px: 1.75,
                      border: '1px solid transparent',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        bgcolor: 'rgba(241, 245, 249, 0.85)',
                        borderColor: 'rgba(226, 232, 240, 0.9)',
                        transform: 'translateX(3px)',
                        '& .nav-icon-box': {
                          bgcolor: theme.palette.primary.main,
                          color: '#ffffff',
                          boxShadow: `0 3px 10px ${theme.palette.primary.main}40`,
                        },
                        '& .nav-chevron': {
                          transform: 'translateX(2px)',
                          color: theme.palette.primary.main,
                        },
                      },
                    }}
                  >
                    {/* Icon Container */}
                    <Box
                      className="nav-icon-box"
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        bgcolor: 'rgba(241, 245, 249, 0.95)',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1.75,
                        flexShrink: 0,
                        color: '#475569',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <IconComponent size={18} />
                    </Box>

                    {/* Section Title Only (Clean, No numbers or sub-text) */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.92rem',
                          color: '#0f172a',
                          lineHeight: 1.3,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>

                    {/* Forward Chevron */}
                    <ArrowForwardIosIcon
                      className="nav-chevron"
                      sx={{
                        fontSize: 12,
                        color: '#cbd5e1',
                        ml: 1,
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* Drawer Bottom CTA Area */}
        <Box
          sx={{
            p: 2.25,
            borderTop: '1px solid rgba(226, 232, 240, 0.9)',
            bgcolor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.25,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleNavClick('#contact')}
            startIcon={<CalendarMonthIcon />}
            sx={{
              py: 1.25,
              fontWeight: 800,
              fontSize: '0.9rem',
              borderRadius: 2.5,
              boxShadow: `0 4px 14px ${theme.palette.primary.main}40`,
            }}
          >
            Free Site Visit
          </Button>

          {venture.contact?.phone && (
            <Button
              variant="outlined"
              fullWidth
              component="a"
              href={`tel:${venture.contact.phone.replace(/[^0-9+]/g, '')}`}
              startIcon={<PhoneInTalkIcon sx={{ fontSize: 18 }} />}
              sx={{
                py: 1,
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#334155',
                borderColor: 'rgba(226, 232, 240, 0.95)',
                borderRadius: 2.5,
                bgcolor: '#FAF8F5',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  bgcolor: '#ffffff',
                  color: theme.palette.primary.main,
                },
              }}
            >
              Direct Helpline: {venture.contact.phone}
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}
