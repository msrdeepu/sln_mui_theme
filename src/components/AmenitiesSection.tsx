import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import BoltIcon from '@mui/icons-material/Bolt';
import PoolIcon from '@mui/icons-material/Pool';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CastleIcon from '@mui/icons-material/Castle';
import SecurityIcon from '@mui/icons-material/Security';
import ParkIcon from '@mui/icons-material/Park';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { VentureData, AmenityItem } from '../types';
import { SITE_CONFIG, getLocationAssetUrl } from '../siteConfig';

interface AmenitiesSectionProps {
  venture: VentureData;
}

function resolveAmenityCategory(title: string, category?: string): string {
  if (category && category !== 'General' && category.trim()) return category;
  const t = (title || '').toLowerCase();
  if (t.includes('wifi') || t.includes('internet') || t.includes('fiber')) return 'Connectivity';
  if (t.includes('power') || t.includes('electric') || t.includes('sewage') || t.includes('drain') || t.includes('pipe')) return 'Utilities';
  if (t.includes('pool') || t.includes('swim') || t.includes('club') || t.includes('play')) return 'Recreation';
  if (t.includes('fire') || t.includes('safety') || t.includes('security')) return 'Safety';
  if (t.includes('arch') || t.includes('entrance') || t.includes('gate')) return 'Architecture';
  return 'Infrastructure';
}

function resolveAmenityDescription(title: string, desc?: string): string {
  if (desc && desc.trim() && desc.trim().toLowerCase() !== (title || '').trim().toLowerCase()) {
    return desc.trim();
  }
  const t = (title || '').toLowerCase();
  if (t.includes('wifi')) return 'High-speed dedicated fiber optic connectivity integrated throughout the layout.';
  if (t.includes('power')) return 'Dedicated underground power cabling with individual plot feeder pillars.';
  if (t.includes('pool')) return 'Resort-style luxury community swimming pool and relaxation deck.';
  if (t.includes('sewage') || t.includes('pipe') || t.includes('drain')) return '100% concealed underground sewage pipeline & stormwater drainage network.';
  if (t.includes('fire')) return 'Modern certified fire prevention infrastructure and safety hydrants.';
  if (t.includes('arch') || t.includes('entrance')) return 'Monumental architectural gateway with 24/7 guarded security access.';
  return 'High-specification development amenity adhering to supreme master planning protocols.';
}

const DEFAULT_API_AMENITIES: AmenityItem[] = [
  {
    id: 1,
    title: 'WiFi',
    category: 'Connectivity',
    image: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236429_wifi.png',
    iconImage: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236429_wifi.png',
    desc: 'High-speed dedicated fiber optic connectivity integrated throughout the layout.',
  },
  {
    id: 2,
    title: 'Power Connection',
    category: 'Utilities',
    image: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236449_power-connection.png',
    iconImage: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236449_power-connection.png',
    desc: 'Dedicated underground power cabling with individual plot feeder pillars.',
  },
  {
    id: 3,
    title: 'Swimming Pool',
    category: 'Recreation',
    image: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236466_swimming-pool.png',
    iconImage: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236466_swimming-pool.png',
    desc: 'Resort-style luxury community swimming pool and relaxation deck.',
  },
  {
    id: 4,
    title: 'Sewage pipe',
    category: 'Utilities',
    image: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236485_sewage-pipe.png',
    iconImage: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236485_sewage-pipe.png',
    desc: '100% concealed underground sewage pipeline & stormwater drainage network.',
  },
  {
    id: 5,
    title: 'Fire Safety Equipment',
    category: 'Safety',
    image: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236496_fire-safety-equipment.png',
    iconImage: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236496_fire-safety-equipment.png',
    desc: 'Modern certified fire prevention infrastructure and safety hydrants.',
  },
  {
    id: 6,
    title: 'GRAND ENTRANCE ARCH',
    category: 'Architecture',
    image: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236515_grand-entrance-arch.png',
    iconImage: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236515_grand-entrance-arch.png',
    desc: 'Monumental architectural gateway with 24/7 guarded security access.',
  },
];

export default function AmenitiesSection({ venture }: AmenitiesSectionProps) {
  const theme = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [amenities, setAmenities] = useState<AmenityItem[]>(() => {
    if (Array.isArray(venture.amenities) && venture.amenities.length > 0) {
      const hasRealImages = venture.amenities.some((a) => a.image && a.image.includes('uploads/amenities'));
      if (hasRealImages) return venture.amenities;
    }
    return DEFAULT_API_AMENITIES;
  });

  useEffect(() => {
    let isMounted = true;
    const fetchApiAmenities = async () => {
      try {
        const res = await fetch(`${SITE_CONFIG.apiBaseUrl}/cms/amenities`);
        if (res.ok) {
          const json = await res.json();
          if (json && json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
            const mapped: AmenityItem[] = json.data.map((a: any, idx: number) => {
              const title = a.title || a.display_name || 'Amenity';
              return {
                id: a.id ? Number(a.id) : idx + 1,
                title: title,
                icon: a.icon || 'Sparkles',
                category: resolveAmenityCategory(title, a.category),
                desc: resolveAmenityDescription(title, a.description),
                image: getLocationAssetUrl(a.icon_image_url || a.image_url || a.icon_image || a.image),
                iconImage: getLocationAssetUrl(a.icon_image_url || a.icon_image),
                color: a.color,
                badge: a.badge,
              };
            });
            if (isMounted) setAmenities(mapped);
          }
        }
      } catch (err) {
        console.warn('[AmenitiesSection] Live API fetch failed:', err);
      }
    };

    fetchApiAmenities();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ['ALL', ...Array.from(new Set(amenities.map((a) => (a.category || 'General').toUpperCase())))];

  const getAmenityImage = (amenity: any): string => {
    if (amenity.image && typeof amenity.image === 'string' && amenity.image.trim()) {
      return amenity.image.startsWith('http') ? amenity.image : getLocationAssetUrl(amenity.image);
    }
    if (amenity.iconImage && typeof amenity.iconImage === 'string' && amenity.iconImage.trim()) {
      return amenity.iconImage.startsWith('http') ? amenity.iconImage : getLocationAssetUrl(amenity.iconImage);
    }
    if (amenity.image_url && typeof amenity.image_url === 'string' && amenity.image_url.trim()) {
      return amenity.image_url;
    }
    return 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236515_grand-entrance-arch.png';
  };

  const getAmenityIcon = (title: string, category?: string) => {
    const t = `${title} ${category || ''}`.toLowerCase();
    if (t.includes('wifi') || t.includes('internet')) return <WifiIcon sx={{ color: '#0284c7', fontSize: 22 }} />;
    if (t.includes('power') || t.includes('electric')) return <BoltIcon sx={{ color: '#d97706', fontSize: 22 }} />;
    if (t.includes('pool') || t.includes('swim')) return <PoolIcon sx={{ color: '#06b6d4', fontSize: 22 }} />;
    if (t.includes('pipe') || t.includes('sewage') || t.includes('drain')) return <WaterDropIcon sx={{ color: '#0284c7', fontSize: 22 }} />;
    if (t.includes('fire') || t.includes('safety')) return <LocalFireDepartmentIcon sx={{ color: '#e11d48', fontSize: 22 }} />;
    if (t.includes('arch') || t.includes('entrance')) return <CastleIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />;
    if (t.includes('security') || t.includes('wall')) return <SecurityIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />;
    if (t.includes('tree') || t.includes('green')) return <ParkIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />;
    return <AutoAwesomeIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />;
  };

  const filteredAmenities = activeCategory === 'ALL'
    ? amenities
    : amenities.filter((a) => (a.category || 'General').toUpperCase() === activeCategory);

  return (
    <Box
      id="amenities"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: '#fafaf9',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
      }}
    >
      {/* Ambient background soft glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${alpha(theme.palette.primary.main, 0.04)} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: { lg: 'flex-end' },
            justifyContent: 'space-between',
            gap: 3,
            pb: 4,
            borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
            mb: 4,
          }}
        >
          <Box sx={{ maxWidth: 740 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                px: 2,
                py: 0.75,
                borderRadius: '9999px',
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                mb: 2,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
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
                Engineered Infrastructure
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.95rem', sm: '2.65rem', lg: '3.15rem' },
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#0f172a',
                lineHeight: 1.14,
              }}
            >
              Master Plan Infrastructure & Amenities
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                fontSize: { xs: '0.95rem', sm: '1.025rem' },
                mt: 1.5,
                lineHeight: 1.65,
              }}
            >
              Every detail is conceived for generational longevity, underground utility reliability, and seamless community living.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: '10px',
              bgcolor: '#ffffff',
              border: '1px solid rgba(203, 213, 225, 0.8)',
              alignSelf: { xs: 'flex-start', lg: 'flex-end' },
              boxShadow: '0 2px 6px -1px rgba(0, 0, 0, 0.04)',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'Roboto Mono, monospace',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#334155',
              }}
            >
              {filteredAmenities.length} of {amenities.length} Verified Amenities
            </Typography>
          </Box>
        </Box>

        {/* Modern Segmented Category Filters */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            overflowX: 'auto',
            pb: 2,
            mb: 4,
            '::-webkit-scrollbar': { height: 4 },
            '::-webkit-scrollbar-thumb': { bgcolor: 'rgba(203, 213, 225, 0.6)', borderRadius: 2 },
          }}
        >
          {categories.map((cat) => {
            const count = cat === 'ALL'
              ? amenities.length
              : amenities.filter((a) => (a.category || 'General').toUpperCase() === cat).length;
            const isSelected = activeCategory === cat;

            return (
              <Box
                key={cat}
                component="button"
                onClick={() => setActiveCategory(cat)}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2.25,
                  py: 1.1,
                  borderRadius: '12px',
                  bgcolor: isSelected ? '#0f172a' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#475569',
                  border: isSelected ? '1.5px solid #0f172a' : '1.5px solid rgba(226, 232, 240, 0.95)',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  boxShadow: isSelected
                    ? '0 6px 16px -2px rgba(15, 23, 42, 0.2)'
                    : '0 2px 4px rgba(0, 0, 0, 0.02)',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    bgcolor: isSelected ? '#1e293b' : '#f8fafc',
                    borderColor: isSelected ? '#1e293b' : theme.palette.primary.light,
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {cat === 'ALL' ? 'All Amenities' : cat}
                </Typography>
                <Box
                  sx={{
                    px: 0.8,
                    py: 0.15,
                    borderRadius: '6px',
                    bgcolor: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(241, 245, 249, 0.9)',
                    color: isSelected ? '#ffffff' : '#64748b',
                    fontSize: '0.675rem',
                    fontWeight: 700,
                    fontFamily: 'Roboto Mono, monospace',
                  }}
                >
                  {count}
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Amenities Cards Grid - Ultra-Modern Architectural Cards */}
        <Grid container spacing={3.5}>
          {filteredAmenities.map((amenity, idx) => {
            const imageUrl = getAmenityImage(amenity);
            const icon = getAmenityIcon(amenity.title, amenity.category);
            const numStr = String(idx + 1).padStart(2, '0');

            return (
              <Grid key={amenity.id || idx} size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    bgcolor: '#ffffff',
                    border: '1.5px solid rgba(226, 232, 240, 0.95)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)',
                    willChange: 'transform, box-shadow',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      boxShadow: '0 22px 38px -8px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.04)',
                      transform: 'translateY(-6px)',
                      '& img': {
                        transform: 'scale(1.08)',
                      },
                      '& .amenity-title': {
                        color: theme.palette.primary.main,
                      },
                      '& .amenity-icon-dock': {
                        transform: 'translateY(-2px) scale(1.06)',
                        boxShadow: `0 8px 16px -2px ${alpha(theme.palette.primary.main, 0.25)}`,
                      },
                      '& .amenity-action-arrow': {
                        transform: 'translateX(4px)',
                        color: theme.palette.primary.main,
                      },
                    },
                  }}
                >
                  {/* Media Container with Frosted Badges */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 10',
                      bgcolor: '#0f172a',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={imageUrl}
                      alt={amenity.title}
                      loading="lazy"
                      onError={(e: any) => {
                        e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                      }}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />

                    {/* Gradient Overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.1) 50%, rgba(15, 23, 42, 0.4) 100%)',
                      }}
                    />

                    {/* Top Row: Category Chip & Index Badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 14,
                        left: 14,
                        right: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        zIndex: 2,
                      }}
                    >
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '8px',
                          bgcolor: 'rgba(15, 23, 42, 0.75)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                          fontFamily: 'Roboto Mono, monospace',
                          fontWeight: 700,
                          fontSize: '0.675rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {amenity.category || 'General'}
                      </Box>

                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: 'Roboto Mono, monospace',
                          fontWeight: 800,
                          fontSize: '0.775rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                        }}
                      >
                        {numStr}
                      </Typography>
                    </Box>

                    {/* Floating Frosted Icon Dock */}
                    <Box
                      className="amenity-icon-dock"
                      sx={{
                        position: 'absolute',
                        bottom: 14,
                        left: 14,
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 16px -2px rgba(0, 0, 0, 0.15)',
                        transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        zIndex: 2,
                      }}
                    >
                      {icon}
                    </Box>
                  </Box>

                  {/* Card Body */}
                  <Box
                    sx={{
                      p: 3,
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      className="amenity-title"
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        color: '#0f172a',
                        mb: 1.25,
                        lineHeight: 1.3,
                        transition: 'color 0.25s ease',
                      }}
                    >
                      {amenity.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: '#64748b',
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        flexGrow: 1,
                        mb: 2.5,
                      }}
                    >
                      {amenity.desc || 'High-specification development amenity adhering to supreme master planning protocols.'}
                    </Typography>

                    {/* Bottom Status / Spec Guarantee Bar */}
                    <Box
                      sx={{
                        pt: 2,
                        borderTop: '1px solid rgba(241, 245, 249, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981' }} />
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: 'Roboto Mono, monospace',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: '#475569',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          Verified Infrastructure
                        </Typography>
                      </Box>

                      <ArrowForwardIcon
                        className="amenity-action-arrow"
                        sx={{
                          fontSize: 16,
                          color: '#94a3b8',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
