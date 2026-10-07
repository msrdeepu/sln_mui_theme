import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import type { VentureData } from './types';
import { micrositeService } from './services/micrositeService';
import { updateDocumentSeo } from './utils/seoManager';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CinematicVideoSection from './components/CinematicVideoSection';
import StatsBadges from './components/StatsBadges';
import WhyChooseSection from './components/WhyChooseSection';
import AboutSection from './components/AboutSection';
import AmenitiesSection from './components/AmenitiesSection';
import MasterPlanSection from './components/MasterPlanSection';
import LocationsSection from './components/LocationsSection';
import BrochureBanner from './components/BrochureBanner';
import FaqSection from './components/FaqSection';
import ContactFormSection from './components/ContactFormSection';
import FooterSection from './components/FooterSection';
import MicrositeSkeleton from './components/MicrositeSkeleton';
import ElevenLabsWidgets from './components/ElevenLabsWidgets';

export default function App() {
  const [currentVenture, setCurrentVenture] = useState<VentureData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchLiveVenture = async () => {
      setIsLoading(true);
      try {
        const live = await micrositeService.loadActiveVenture();
        if (isMounted) {
          if (live) {
            setCurrentVenture(live);
            updateDocumentSeo(live);
          } else {
            console.warn('[App] Could not load venture, using default');
          }
        }
      } catch (err) {
        console.error('[App] Error loading live venture:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchLiveVenture();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (currentVenture) {
      updateDocumentSeo(currentVenture);
    }
  }, [currentVenture]);

  // Sync dynamic CSS custom properties for global compatibility
  useEffect(() => {
    if (!currentVenture?.colorPalette) return;
    const p = currentVenture.colorPalette;
    const root = document.documentElement;

    root.style.setProperty('--palette-primary-hex', p.primary);
    root.style.setProperty('--palette-accent-hex', p.accent);
    root.style.setProperty('--palette-bg', p.background);
    root.style.setProperty('--palette-card-bg', p.cardBg);
    root.style.setProperty('--palette-text-primary', p.textPrimary);
    root.style.setProperty('--palette-border', p.borderColor);

    document.body.style.backgroundColor = p.background;
  }, [currentVenture]);

  // Reactive Dynamic Material UI Theme
  const dynamicTheme = useMemo(() => {
    const p = currentVenture?.colorPalette;
    const primary = p?.primary || '#059669';
    const accent = p?.accent || '#10b981';
    const bg = p?.background || '#fafaf9';
    const cardBg = p?.cardBg || '#ffffff';
    const textPrimary = p?.textPrimary || '#0f172a';
    const borderColor = p?.borderColor || 'rgba(226, 232, 240, 0.9)';

    return createTheme({
      palette: {
        primary: {
          main: primary,
          light: accent,
          dark: primary,
          contrastText: '#ffffff',
        },
        secondary: {
          main: accent,
        },
        background: {
          default: bg,
          paper: cardBg,
        },
        text: {
          primary: textPrimary,
          secondary: '#64748b',
        },
        divider: borderColor,
      },
      typography: {
        fontFamily: '"Plus Jakarta Sans", "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        h1: {
          fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
          fontWeight: 900,
        },
        h2: {
          fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
          fontWeight: 900,
        },
        h3: {
          fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
          fontWeight: 800,
        },
        h4: {
          fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
          fontWeight: 800,
        },
        h5: {
          fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
          fontWeight: 700,
        },
        h6: {
          fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
          fontWeight: 700,
        },
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiContainer: {
          defaultProps: {
            maxWidth: false,
          },
          styleOverrides: {
            root: {
              maxWidth: '1280px !important',
              marginLeft: 'auto !important',
              marginRight: 'auto !important',
              paddingLeft: '24px !important',
              paddingRight: '24px !important',
              '@media (min-width: 640px)': {
                paddingLeft: '32px !important',
                paddingRight: '32px !important',
              },
              '@media (min-width: 1024px)': {
                paddingLeft: '40px !important',
                paddingRight: '40px !important',
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 10,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 12,
            },
            rounded: {
              borderRadius: 12,
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              fontWeight: 600,
            },
          },
        },
      },
    });
  }, [currentVenture?.colorPalette]);

  if (isLoading || !currentVenture) {
    return <MicrositeSkeleton />;
  }

  return (
    <ThemeProvider theme={dynamicTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        <Navbar venture={currentVenture} />
        <Box component="main">
          <HeroSection venture={currentVenture} />
          {(currentVenture.vimeoId || currentVenture.vimeoUrl) && (
            <CinematicVideoSection venture={currentVenture} />
          )}
          <StatsBadges venture={currentVenture} />
          <WhyChooseSection venture={currentVenture} />
          <AboutSection venture={currentVenture} />
          <AmenitiesSection venture={currentVenture} />
          <MasterPlanSection venture={currentVenture} />
          <LocationsSection venture={currentVenture} />
          <BrochureBanner venture={currentVenture} />
          <FaqSection venture={currentVenture} />
          <ContactFormSection venture={currentVenture} />
        </Box>
        <FooterSection venture={currentVenture} />
        {currentVenture && (
          <ElevenLabsWidgets
            chatbotAgentId={currentVenture.chatbotAgentId}
            voicebotAgentId={currentVenture.voicebotAgentId}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}
