import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import type { VentureData, FooterSocialLink, FooterColumn } from '../types';

interface FooterSectionProps {
  venture: VentureData;
}

export default function FooterSection({ venture }: FooterSectionProps) {
  const footer = venture.footer || {};

  // ── 1. COLORS ────────────────────────────────────────────────────────────
  const bgColor = (footer.bgColor && footer.bgColor !== '#090d16') ? footer.bgColor : '#c9082a';
  const cardBgColor = (footer.cardBgColor && !footer.cardBgColor.includes('rgba(255, 255, 255, 0.04)'))
    ? footer.cardBgColor
    : '#ffffff';
  const accentColor = (footer.accentColor && footer.accentColor !== '#c5a880') ? footer.accentColor : '#c9082a';
  const textColor = (footer.textColor && footer.textColor !== '#94a3b8') ? footer.textColor : '#1e293b';
  const bottomTextColor = footer.bottomTextColor || '#ffffff';

  // ── 2. GOOGLE MAP EMBED ──────────────────────────────────────────────────
  const rawMapUrl =
    footer.mapEmbedUrl ||
    venture.contact?.googleMapsEmbedUrl ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31050.15024419996!2d80.005085!3d13.585526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d81232870197d%3A0xb35a0cfb247f082e!2sTada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000';

  const mapEmbedSrc = React.useMemo(() => {
    if (!rawMapUrl || !rawMapUrl.trim()) return '';
    const trimmed = rawMapUrl.trim();
    const match = trimmed.match(/src=["']([^"']+)["']/i);
    return match ? match[1] : trimmed;
  }, [rawMapUrl]);

  const showMap = footer.showMap !== false && Boolean(mapEmbedSrc);

  // ── 3. FLOATING CIRCULAR SOCIAL BADGES ────────────────────────────────────
  const defaultSocials: FooterSocialLink[] = [
    { platform: 'facebook', url: 'https://facebook.com' },
    { platform: 'twitter', url: 'https://twitter.com' },
    { platform: 'google', url: 'https://google.com' },
    { platform: 'linkedin', url: 'https://linkedin.com' },
    { platform: 'rss', url: 'https://rss.com' },
  ];

  const rawSocials = footer.socials !== undefined ? footer.socials : defaultSocials;
  const validSocials = (Array.isArray(rawSocials) ? rawSocials : []).filter(
    (s) => Boolean(s && s.url && s.url.trim().length > 0)
  );

  // ── 4. CENTER HEADLINE ───────────────────────────────────────────────────
  const headline = footer.headline !== undefined ? footer.headline.trim() : "Let's Connect";

  // ── 5. ALL 4 COLUMNS AS FLEXIBLE LINK COLUMNS (NO MORE ADDRESS / PHONE / MAIL) ──
  const defaultCol1: FooterColumn = {
    title: 'Services',
    items: [
      { label: 'Web Design', href: '#' },
      { label: 'Development', href: '#' },
      { label: 'Graphic Design', href: '#' },
      { label: 'Branding', href: '#' },
    ],
  };

  const defaultCol2: FooterColumn = {
    title: 'Company',
    items: [
      { label: 'About Us', href: '#' },
      { label: 'Story', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  };

  const defaultCol3: FooterColumn = {
    title: 'Links',
    items: [
      { label: 'Company', href: '#' },
      { label: 'Products', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Portfolio', href: '#' },
    ],
  };

  const defaultCol4: FooterColumn = {
    title: 'Get in Touch',
    items: [
      { label: 'Customer Support', href: '#' },
      { label: 'Help Desk', href: '#' },
      { label: 'Site Office', href: '#contact' },
      { label: 'Directions', href: '#locations' },
    ],
  };

  const col1 = footer.col1 !== undefined ? footer.col1 : defaultCol1;
  const col2 = footer.col2 !== undefined ? footer.col2 : defaultCol2;
  const col3 = footer.col3 !== undefined ? footer.col3 : defaultCol3;
  const col4 = footer.col4 !== undefined ? footer.col4 : defaultCol4;

  const hasColContent = (col?: FooterColumn) => {
    if (!col) return false;
    const hasTitle = Boolean(col.title && col.title.trim());
    const hasItems = Boolean(
      col.items && col.items.some((it) => it && it.label && it.label.trim())
    );
    return hasTitle || hasItems;
  };

  const hasCol1 = hasColContent(col1);
  const hasCol2 = hasColContent(col2);
  const hasCol3 = hasColContent(col3);
  const hasCol4 = hasColContent(col4);

  const activeColumnsCount = [hasCol1, hasCol2, hasCol3, hasCol4].filter(Boolean).length;

  const getColSpan = () => {
    if (activeColumnsCount <= 1) return { xs: 12 };
    if (activeColumnsCount === 2) return { xs: 12, sm: 6 };
    if (activeColumnsCount === 3) return { xs: 12, sm: 6, md: 4 };
    return { xs: 12, sm: 6, md: 3 };
  };

  const colSpan = getColSpan();

  // Social Icon Renderer
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <FacebookIcon sx={{ fontSize: 24 }} />;
      case 'twitter':
        return <TwitterIcon sx={{ fontSize: 22 }} />;
      case 'google':
        return (
          <Typography
            component="span"
            sx={{
              fontFamily: '"Inter", "Roboto", sans-serif',
              fontWeight: 900,
              fontSize: '1.05rem',
              lineHeight: 1,
              letterSpacing: '-0.05em',
            }}
          >
            G+
          </Typography>
        );
      case 'linkedin':
        return (
          <Typography
            component="span"
            sx={{
              fontFamily: '"Inter", "Roboto", sans-serif',
              fontWeight: 900,
              fontSize: '1.15rem',
              lineHeight: 1,
              letterSpacing: '-0.05em',
            }}
          >
            in
          </Typography>
        );
      case 'rss':
        return <RssFeedIcon sx={{ fontSize: 22 }} />;
      case 'instagram':
        return <InstagramIcon sx={{ fontSize: 22 }} />;
      case 'youtube':
        return <YouTubeIcon sx={{ fontSize: 22 }} />;
      case 'whatsapp':
        return <WhatsAppIcon sx={{ fontSize: 22 }} />;
      default:
        return <OpenInNewIcon sx={{ fontSize: 20 }} />;
    }
  };

  // Optional Bottom Legal Bar
  const showBottomBar = Boolean(
    footer.showBottomBar &&
    (Boolean(footer.copyrightText?.trim()) || (footer.bottomLinks && footer.bottomLinks.length > 0))
  );

  const renderColumn = (col: FooterColumn | undefined, hasContent: boolean) => {
    if (!hasContent || !col) return null;
    return (
      <Grid size={colSpan}>
        {Boolean(col.title && col.title.trim()) && (
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              fontSize: '1.1rem',
              color: textColor,
              mb: 2.25,
              letterSpacing: '-0.01em',
            }}
          >
            {col.title}
          </Typography>
        )}
        {Array.isArray(col.items) && col.items.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {col.items
              .filter((it) => it && it.label && it.label.trim())
              .map((item, idx) => (
                <Link
                  key={`${item.label}-${idx}`}
                  href={item.href || '#'}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  underline="none"
                  sx={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    width: 'fit-content',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: accentColor,
                      transform: 'translateX(3px)',
                    },
                  }}
                >
                  <span>{item.label}</span>
                  {item.isExternal && (
                    <OpenInNewIcon sx={{ fontSize: 12, opacity: 0.6 }} />
                  )}
                </Link>
              ))}
          </Box>
        )}
      </Grid>
    );
  };

  return (
    <Box
      component="footer"
      id="site-footer"
      sx={{
        width: '100%',
        position: 'relative',
        bgcolor: bgColor,
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* ── 1. TOP SECTION: FULL-WIDTH INTERACTIVE GOOGLE MAP ── */}
      {showMap && (
        <Box
          sx={{
            width: '100%',
            height: { xs: 280, sm: 330, md: 360 },
            position: 'relative',
            overflow: 'hidden',
            bgcolor: '#e2e8f0',
          }}
        >
          <iframe
            title="Location Map"
            src={mapEmbedSrc}
            width="100%"
            height="100%"
            style={{
              border: 0,
              display: 'block',
              width: '100%',
              height: '100%',
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      )}

      {/* ── 2. BOTTOM SECTION: SOLID RED BAND WITH OVERLAPPING WHITE CARD ── */}
      <Box
        sx={{
          bgcolor: bgColor,
          position: 'relative',
          pt: 0,
          pb: showBottomBar ? { xs: 5, md: 6 } : { xs: 8, sm: 10, md: 12 },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: '1080px',
            px: { xs: 2.5, sm: 4 },
            position: 'relative',
          }}
        >
          {/* ── THE OVERLAPPED WHITE CARD (STRADDLES MAP & RED BAND) ── */}
          <Box
            sx={{
              position: 'relative',
              bgcolor: cardBgColor,
              borderRadius: '2px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.18), 0 5px 15px rgba(0, 0, 0, 0.08)',
              // Overlap map with compact clearance so location pin is clearly visible without taking excessive space:
              mt: showMap ? { xs: '-50px', sm: '-60px', md: '-70px' } : 0,
              pt: { xs: 6.5, sm: 7, md: 7.5 },
              pb: { xs: 6, sm: 6.5, md: 7 },
              px: { xs: 3, sm: 5, md: 7 },
              zIndex: 10,
              border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
          >
            {/* ── 5 CIRCULAR RED SOCIAL BADGES PERCHED ON TOP EDGE ── */}
            {validSocials.length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: { xs: 1.5, sm: 2 },
                  zIndex: 20,
                  flexWrap: 'nowrap',
                }}
              >
                {validSocials.map((social, idx) => (
                  <Box
                    key={`${social.platform}-${idx}`}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.platform.toUpperCase()}
                    sx={{
                      width: { xs: 46, sm: 52, md: 54 },
                      height: { xs: 46, sm: 52, md: 54 },
                      borderRadius: '50%',
                      bgcolor: accentColor,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.28)',
                      textDecoration: 'none',
                      transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-3px) scale(1.06)',
                        boxShadow: '0 8px 22px rgba(0, 0, 0, 0.38)',
                        filter: 'brightness(1.1)',
                      },
                    }}
                  >
                    {renderSocialIcon(social.platform)}
                  </Box>
                ))}
              </Box>
            )}

            {/* ── CENTER HEADLINE ("Let's Connect") ── */}
            {Boolean(headline) && (
              <Typography
                variant="h4"
                sx={{
                  textAlign: 'center',
                  fontWeight: 800,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                  letterSpacing: '-0.02em',
                  color: accentColor,
                  mb: { xs: 4.5, sm: 5.5 },
                  mt: 0.5,
                }}
              >
                {headline}
              </Typography>
            )}

            {/* ── 4 COLUMNS AS LINKS GRID ── */}
            {activeColumnsCount > 0 && (
              <Grid container spacing={{ xs: 4, sm: 4.5, md: 4 }}>
                {renderColumn(col1, hasCol1)}
                {renderColumn(col2, hasCol2)}
                {renderColumn(col3, hasCol3)}
                {renderColumn(col4, hasCol4)}
              </Grid>
            )}
          </Box>
        </Container>

        {/* ── OPTIONAL LEGAL / COPYRIGHT BOTTOM BAR ── */}
        {showBottomBar && (
          <Container maxWidth="lg" sx={{ pt: 4, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 1.5,
                color: bottomTextColor,
                fontSize: '0.78rem',
                opacity: 0.9,
              }}
            >
              {Boolean(footer.copyrightText?.trim()) && (
                <span>{footer.copyrightText}</span>
              )}

              {Array.isArray(footer.bottomLinks) &&
                footer.bottomLinks.map((link, idx) => (
                  <React.Fragment key={`${link.label}-${idx}`}>
                    <span style={{ opacity: 0.6 }}>|</span>
                    <Link
                      href={link.href || '#'}
                      underline="none"
                      sx={{
                        color: bottomTextColor,
                        opacity: 0.85,
                        transition: 'opacity 0.2s ease',
                        '&:hover': { opacity: 1, textDecoration: 'underline' },
                      }}
                    >
                      {link.label}
                    </Link>
                  </React.Fragment>
                ))}
            </Box>
          </Container>
        )}
      </Box>
    </Box>
  );
}
