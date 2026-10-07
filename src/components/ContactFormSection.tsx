import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  TextField,
  useTheme,
  Alert,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import confetti from 'canvas-confetti';
import type { VentureData } from '../types';
import { API_ENDPOINTS } from '../siteConfig';

interface ContactFormSectionProps {
  venture: VentureData;
}

export default function ContactFormSection({ venture }: ContactFormSectionProps) {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plotType: 'Villa Plot',
    visitDate: '',
    message: 'Requesting Site Visit',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const directionsUrl =
    venture.contact?.directionsUrl ||
    'https://maps.app.goo.gl/ccX7VBApuJTJGqKHA';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(API_ENDPOINTS.submitInquiry, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          venture_id: venture.ventureId || 232,
          venture_slug: (venture as any).slug || '',
          venture_name: venture.title,
          name: formData.name,
          phone: formData.phone,
          mobile: formData.phone,
          email: formData.email,
          plot_number: formData.plotType,
          booking_date: formData.visitDate,
          message: `Plot Type: ${formData.plotType} | Visit Date: ${formData.visitDate} | Note: ${formData.message}`,
          source: 'mui_theme_3_architectural_microsite',
        }),
      });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: '#ffffff',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 5, lg: 6 }} sx={{ alignItems: 'flex-start' }}>
          {/* Left Column: Experience Center Information */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box sx={{ mb: 4 }}>
              <Chip
                label="Site Visit"
                size="small"
                sx={{
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  mb: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  color: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.light}`,
                }}
              />

              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.85rem', sm: '2.5rem', lg: '3rem' },
                  fontWeight: 900,
                  letterSpacing: '-0.025em',
                  color: '#0f172a',
                  lineHeight: 1.15,
                  mb: 2,
                }}
              >
                Plan Your Site Visit
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#64748b',
                  fontSize: { xs: '0.95rem', sm: '1.025rem' },
                  lineHeight: 1.6,
                }}
              >
                Visit the venture in person to explore available plots, walk through the layout, and discuss your plans with our friendly team.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Phone Line Card */}
              {Boolean(venture.contact?.phone && venture.contact.phone.trim()) && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: 'rgba(248, 250, 252, 0.9)',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2.5,
                      bgcolor: `${theme.palette.primary.main}15`,
                      color: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      shrink: 0,
                    }}
                  >
                    <PhoneIcon />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'Roboto Mono, monospace',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        color: 'text.secondary',
                        display: 'block',
                      }}
                    >
                      Call Us Directly
                    </Typography>
                    <Typography
                      component="a"
                      href={`tel:${venture.contact?.phone}`}
                      variant="subtitle1"
                      sx={{
                        fontWeight: 800,
                        color: '#0f172a',
                        fontFamily: 'Roboto Mono, monospace',
                        textDecoration: 'none',
                        '&:hover': { color: theme.palette.primary.main },
                      }}
                    >
                      {venture.contact?.phone}
                    </Typography>
                  </Box>
                </Paper>
              )}

              {/* Map Card */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 3.5 },
                  borderRadius: 4.5,
                  bgcolor: 'rgba(248, 250, 252, 0.95)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        bgcolor: `${theme.palette.primary.main}15`,
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MapIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a' }}>
                        Venture Location Map
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Interactive GPS & Access Route
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    size="small"
                    variant="outlined"
                    href={directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    endIcon={<OpenInNewIcon sx={{ fontSize: '13px !important' }} />}
                    sx={{
                      borderRadius: 2,
                      fontFamily: 'Roboto Mono, monospace',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      bgcolor: '#ffffff',
                    }}
                  >
                    Open Maps
                  </Button>
                </Box>

                <Box
                  sx={{
                    width: '100%',
                    height: 220,
                    borderRadius: 2.5,
                    overflow: 'hidden',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    bgcolor: '#e2e8f0',
                  }}
                >
                  <iframe
                    title="Venture Location Google Map"
                    src={
                      venture.contact?.googleMapsEmbedUrl ||
                      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31050.15024419996!2d80.005085!3d13.585526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d81232870197d%3A0xb35a0cfb247f082e!2sTada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000'
                    }
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Right Column: Inquiry Form Card */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3.5, sm: 5, md: 5.5 },
                borderRadius: 5,
                bgcolor: '#ffffff',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.06)',
              }}
            >
              {submitted ? (
                <Box sx={{ py: 8, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: 'rgba(16, 185, 129, 0.1)',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 36 }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', mb: 1 }}>
                    Site Visit Request Received!
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 440, mb: 3 }}>
                    Thank you! Our executive team will reach out to confirm your scheduled site visit and assist you in selecting your preferred plot.
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        plotType: 'Villa Plot',
                        visitDate: '',
                        message: 'Requesting Site Visit',
                      });
                    }}
                    sx={{ borderRadius: 2.5, fontWeight: 700 }}
                  >
                    Submit Another Inquiry
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a' }}>
                      Book a Free Site Visit
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                      Share your details and our team will get in touch to coordinate your visit.
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        required
                        fullWidth
                        label="Your Full Name *"
                        placeholder="e.g. Rajesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5, bgcolor: '#f8fafc' } }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        required
                        fullWidth
                        type="tel"
                        label="Contact Number *"
                        placeholder="+91 98480 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5, bgcolor: '#f8fafc' } }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        type="email"
                        label="Email Address (Optional)"
                        placeholder="rajesh@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5, bgcolor: '#f8fafc' } }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Preferred Visit Date"
                        slotProps={{ inputLabel: { shrink: true } }}
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5, bgcolor: '#f8fafc' } }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Specific Requirements / Message"
                        placeholder="Mention your preferred plot size (e.g. 1500 sqft, corner unit, east-facing)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5, bgcolor: '#f8fafc' } }}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={isSubmitting}
                    startIcon={<SendIcon />}
                    sx={{
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      boxShadow: 3,
                      mt: 1,
                    }}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Book Free Site Visit'}
                  </Button>

                  <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', fontFamily: 'Roboto Mono, monospace' }}>
                    Statutory Privacy: Your details are encrypted and kept strictly confidential.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
