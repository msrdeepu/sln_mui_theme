import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Chip,
  Button,
  useTheme,
  Skeleton,
} from '@mui/material';
import {
  Compass,
  Plane,
  Factory,
  Landmark,
  Building2,
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react';
import type { VentureData, LocationItem } from '../types';
import { SITE_CONFIG, getLocationAssetUrl } from '../siteConfig';

interface LocationsSectionProps {
  venture: VentureData;
}

export default function LocationsSection({ venture }: LocationsSectionProps) {
  const theme = useTheme();
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [liveLocations, setLiveLocations] = useState<LocationItem[]>(
    Array.isArray(venture.locations) && venture.locations.length > 0 ? venture.locations : []
  );
  const [isLoading, setIsLoading] = useState<boolean>(!venture.locations || venture.locations.length === 0);

  // Fetch strictly live CMS prime locations from API
  useEffect(() => {
    let isMounted = true;
    const fetchLiveLocations = async () => {
      try {
        const vId = venture.ventureId || SITE_CONFIG.activeVentureId || '232';
        let res = await fetch(`${SITE_CONFIG.apiBaseUrl}/cms/venture-locations?venture_id=${vId}`);
        let json = res.ok ? await res.json() : null;

        // If specific venture query returned 0, fetch all active locations
        if (!json || !Array.isArray(json.data) || json.data.length === 0) {
          const fallbackRes = await fetch(`${SITE_CONFIG.apiBaseUrl}/cms/venture-locations`);
          if (fallbackRes.ok) {
            json = await fallbackRes.json();
          }
        }

        if (json && json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
          const mapped: LocationItem[] = json.data.map((n: any, idx: number) => ({
            id: n.id ? Number(n.id) : idx + 1,
            title: n.title || 'Prime Landmark',
            distance: n.distance
              ? String(n.distance).toUpperCase().includes('KM')
                ? String(n.distance).toUpperCase()
                : `${n.distance} KM`
              : '—',
            travelTime: n.travel_time || '10 Mins Drive',
            group: n.group ? String(n.group).trim() : 'Connectivity',
            image: getLocationAssetUrl(n.image_url || n.image),
            desc: n.description || n.desc || '',
          }));
          if (isMounted) {
            setLiveLocations(mapped);
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('[LocationsSection] Live locations fetch failed:', err);
      }
      if (isMounted) {
        if (venture.locations && venture.locations.length > 0) {
          setLiveLocations(venture.locations);
        }
        setIsLoading(false);
      }
    };

    fetchLiveLocations();
    return () => {
      isMounted = false;
    };
  }, [venture.ventureId, venture.locations]);

  // Derive unique filter groups purely from the loaded live data
  const uniqueGroups = Array.from(new Set(liveLocations.map((l) => l.group))).filter(Boolean);

  const getGroupIcon = (groupName: string) => {
    const g = groupName.toLowerCase();
    if (g.includes('airport') || g.includes('flight') || g.includes('aviation')) {
      return <Plane size={15} />;
    }
    if (g.includes('manufacturing') || g.includes('industry') || g.includes('hub') || g.includes('factory') || g.includes('tcl')) {
      return <Factory size={15} />;
    }
    if (g.includes('temple') || g.includes('heritage') || g.includes('spiritual') || g.includes('historic')) {
      return <Landmark size={15} />;
    }
    if (g.includes('town') || g.includes('city') || g.includes('urban')) {
      return <Building2 size={15} />;
    }
    return <MapPin size={15} />;
  };

  const groups = [
    { key: 'all', label: 'All Landmarks', icon: <Compass size={15} /> },
    ...uniqueGroups.map((g) => ({
      key: g,
      label: g,
      icon: getGroupIcon(g),
    })),
  ];

  const filteredLocations =
    selectedGroup === 'all'
      ? liveLocations
      : liveLocations.filter((l) => l.group === selectedGroup);

  // If 4 locations and 'all' filter is active, present the bento mosaic layout matching the reference
  const isBentoMode = selectedGroup === 'all' && filteredLocations.length === 4;

  return (
    <Box
      id="locations"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: '#fafaf9',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
      }}
    >
      <Container>
        {/* Section Header */}
        <Box
          sx={{
            pb: 3,
            borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
            mb: 4,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.85rem', sm: '2.5rem', lg: '3rem' },
              fontWeight: 900,
              letterSpacing: '-0.025em',
              color: '#0f172a',
              lineHeight: 1.15,
            }}
          >
            Regional Connectivity
          </Typography>
        </Box>

        {/* Group Filter Tabs (Clean rectangular pills matching reference design) */}
        {groups.length > 1 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 1.25,
              mb: 4,
            }}
          >
            {groups.map((grp) => {
              const active = selectedGroup === grp.key;
              return (
                <Button
                  key={grp.key}
                  onClick={() => setSelectedGroup(grp.key)}
                  size="small"
                  startIcon={grp.icon}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontFamily: 'Roboto Mono, monospace',
                    fontWeight: active ? 800 : 600,
                    textTransform: 'none',
                    bgcolor: active ? '#f59e0b' : '#ffffff',
                    color: active ? '#0f172a' : '#475569',
                    border: active ? '1px solid #d97706' : '1px solid rgba(226, 232, 240, 0.9)',
                    boxShadow: active ? '0 2px 4px rgba(245, 158, 11, 0.25)' : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: active ? '#f59e0b' : '#f1f5f9',
                      color: active ? '#0f172a' : '#0f172a',
                      borderColor: active ? '#d97706' : 'rgba(203, 213, 225, 1)',
                    },
                  }}
                >
                  {grp.label}
                </Button>
              );
            })}
          </Box>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                <Skeleton
                  variant="rounded"
                  height={380}
                  sx={{ borderRadius: '14px', bgcolor: 'rgba(226, 232, 240, 0.6)' }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State */}
        {!isLoading && filteredLocations.length === 0 && (
          <Box sx={{ py: 10, textAlign: 'center', color: '#94a3b8' }}>
            <MapPin size={40} />
            <Typography variant="body2" sx={{ mt: 1.5 }}>
              No prime locations found in this category.
            </Typography>
          </Box>
        )}

        {/* Modern Bento Mosaic Layout (When in 'all' mode with 4 locations - exactly matching reference) */}
        {!isLoading && isBentoMode && (
          <Grid container spacing={3}>
            {/* Card 1: Featured Large (Airport) - 5 Columns */}
            <Grid size={{ xs: 12, md: 6, lg: 5 }}>
              <Paper
                elevation={2}
                sx={{
                  position: 'relative',
                  height: { xs: 340, sm: 400, lg: 460 },
                  borderRadius: '14px',
                  overflow: 'hidden',
                  bgcolor: '#0f172a',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.25)',
                    borderColor: '#f59e0b',
                    '& img': { transform: 'scale(1.05)' },
                  },
                }}
              >
                <Box
                  component="img"
                  src={filteredLocations[0].image}
                  alt={filteredLocations[0].title}
                  loading="lazy"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80';
                  }}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)',
                  }}
                />
                <Box sx={{ position: 'absolute', insetX: 0, bottom: 0, p: { xs: 3, sm: 3.5 } }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: { xs: '1.15rem', sm: '1.35rem' },
                      letterSpacing: '-0.01em',
                      lineHeight: 1.25,
                      textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                    }}
                  >
                    {filteredLocations[0].title} –{' '}
                    <Box component="span" sx={{ color: '#f59e0b', fontWeight: 900 }}>
                      {filteredLocations[0].distance}
                    </Box>
                  </Typography>
                  {filteredLocations[0].desc && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.82)',
                        fontSize: '0.825rem',
                        fontWeight: 400,
                        mt: 1,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {filteredLocations[0].desc}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>

            {/* Middle Column: 2 Stacked Cards (TCL & Srikalahasti Temple) - 4 Columns */}
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%', justifyContent: 'space-between' }}>
                {/* Card 2: TCL */}
                <Paper
                  elevation={2}
                  sx={{
                    position: 'relative',
                    height: { xs: 200, sm: 215, lg: 218 },
                    borderRadius: '14px',
                    overflow: 'hidden',
                    bgcolor: '#0f172a',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 16px 25px -8px rgba(0, 0, 0, 0.25)',
                      borderColor: '#f59e0b',
                      '& img': { transform: 'scale(1.05)' },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={filteredLocations[1].image}
                    alt={filteredLocations[1].title}
                    loading="lazy"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                    }}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                    }}
                  />
                  <Box sx={{ position: 'absolute', insetX: 0, bottom: 0, p: { xs: 2.5, sm: 3 } }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: { xs: '1.05rem', sm: '1.15rem' },
                        letterSpacing: '-0.01em',
                        lineHeight: 1.25,
                        textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                      }}
                    >
                      {filteredLocations[1].title} –{' '}
                      <Box component="span" sx={{ color: '#f59e0b', fontWeight: 900 }}>
                        {filteredLocations[1].distance}
                      </Box>
                    </Typography>
                  </Box>
                </Paper>

                {/* Card 3: Srikalahasti Temple */}
                <Paper
                  elevation={2}
                  sx={{
                    position: 'relative',
                    height: { xs: 200, sm: 215, lg: 218 },
                    borderRadius: '14px',
                    overflow: 'hidden',
                    bgcolor: '#0f172a',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 16px 25px -8px rgba(0, 0, 0, 0.25)',
                      borderColor: '#f59e0b',
                      '& img': { transform: 'scale(1.05)' },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={filteredLocations[2].image}
                    alt={filteredLocations[2].title}
                    loading="lazy"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80';
                    }}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                    }}
                  />
                  <Box sx={{ position: 'absolute', insetX: 0, bottom: 0, p: { xs: 2.5, sm: 3 } }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: { xs: '1.05rem', sm: '1.15rem' },
                        letterSpacing: '-0.01em',
                        lineHeight: 1.25,
                        textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                      }}
                    >
                      {filteredLocations[2].title} –{' '}
                      <Box component="span" sx={{ color: '#f59e0b', fontWeight: 900 }}>
                        {filteredLocations[2].distance}
                      </Box>
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Grid>

            {/* Card 4: Yerpedu - 3 Columns Vertical Card */}
            <Grid size={{ xs: 12, md: 12, lg: 3 }}>
              <Paper
                elevation={2}
                sx={{
                  position: 'relative',
                  height: { xs: 340, sm: 400, lg: 460 },
                  borderRadius: '14px',
                  overflow: 'hidden',
                  bgcolor: '#0f172a',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.25)',
                    borderColor: '#f59e0b',
                    '& img': { transform: 'scale(1.05)' },
                  },
                }}
              >
                <Box
                  component="img"
                  src={filteredLocations[3].image}
                  alt={filteredLocations[3].title}
                  loading="lazy"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80';
                  }}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)',
                  }}
                />
                <Box sx={{ position: 'absolute', insetX: 0, bottom: 0, p: { xs: 3, sm: 3.5 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: { xs: '1.15rem', sm: '1.25rem' },
                      letterSpacing: '-0.01em',
                      lineHeight: 1.25,
                      textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                    }}
                  >
                    {filteredLocations[3].title} –{' '}
                    <Box component="span" sx={{ color: '#f59e0b', fontWeight: 900 }}>
                      {filteredLocations[3].distance}
                    </Box>
                  </Typography>
                  {filteredLocations[3].desc && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.82)',
                        fontSize: '0.825rem',
                        fontWeight: 400,
                        mt: 1,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {filteredLocations[3].desc}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Standard Responsive Grid (Used when filtered by category or count != 4) */}
        {!isLoading && (!isBentoMode && filteredLocations.length > 0) && (
          <Grid container spacing={3.5}>
            {filteredLocations.map((loc, idx) => (
              <Grid key={loc.id || idx} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Paper
                  elevation={2}
                  sx={{
                    position: 'relative',
                    height: 380,
                    borderRadius: '14px',
                    overflow: 'hidden',
                    bgcolor: '#0f172a',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
                      borderColor: '#f59e0b',
                      '& img': {
                        transform: 'scale(1.05)',
                      },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={loc.image}
                    alt={loc.title}
                    loading="lazy"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80';
                    }}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)',
                    }}
                  />

                  {/* Group Badge Top Left - Clean, Never Clipped */}
                  <Chip
                    label={loc.group || 'Landmark'}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      zIndex: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      fontFamily: 'Roboto Mono, monospace',
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: '#0f172a',
                      borderRadius: '6px',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                    }}
                  />

                  {/* Bottom Text Details */}
                  <Box sx={{ position: 'absolute', insetX: 0, bottom: 0, p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        lineHeight: 1.25,
                        textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                      }}
                    >
                      {loc.title} –{' '}
                      <Box component="span" sx={{ color: '#f59e0b', fontWeight: 900 }}>
                        {loc.distance}
                      </Box>
                    </Typography>
                    {loc.desc && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.82)',
                          fontSize: '0.8rem',
                          mt: 1,
                          lineHeight: 1.45,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {loc.desc}
                      </Typography>
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
