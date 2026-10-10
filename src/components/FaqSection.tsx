import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { VentureData } from '../types';

interface FaqSectionProps {
  venture: VentureData;
}

export default function FaqSection({ venture }: FaqSectionProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = Array.isArray(venture.faqs) && venture.faqs.length > 0
    ? venture.faqs
    : [
        { question: 'Is the layout statutory approved and legally certified?', answer: 'Yes, the layout is certified and approved by competent town planning authorities with 100% title scrutiny and clear legal ownership.' },
        { question: 'Are plot buyers eligible for immediate spot registration?', answer: 'Yes, plots possess individual title clearance allowing immediate spot registration upon statutory documentation.' },
        { question: 'Which financial institutions offer pre-approved home/plot loans?', answer: 'Pre-approved loan facilities are active with premier banks including State Bank of India (SBI), HDFC Bank, ICICI Bank, and leading nationalized lenders.' },
        { question: 'What road dimensions and utility infrastructures are implemented?', answer: 'The layout features 40 & 50 feet wide asphalt blacktop avenues, concealed underground drainage, transformer electrification, and 24/7 guarded security.' },
      ];

  return (
    <Box
      id="faqs"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: '#fafaf9',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
      }}
    >
      <Container maxWidth="md">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.85rem', sm: '2.5rem', lg: '2.85rem' },
              fontWeight: 900,
              letterSpacing: '-0.025em',
              color: '#0f172a',
              lineHeight: 1.15,
            }}
          >
            Frequently Asked Questions
          </Typography>
        </Box>

        {/* Material Accordions */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {faqs.map((faq, idx) => {
            const panelId = `panel${idx}`;
            const isPanelExpanded = expanded === panelId;

            return (
              <Accordion
                key={idx}
                expanded={isPanelExpanded}
                onChange={handleChange(panelId)}
                elevation={0}
                sx={{
                  bgcolor: '#ffffff',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  borderRadius: '16px !important',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  '&:before': { display: 'none' },
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: isPanelExpanded ? theme.palette.primary.main : '#64748b' }} />}
                  sx={{
                    px: 3,
                    py: 1,
                    '& .MuiAccordionSummary-content': {
                      my: 1.25,
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: isPanelExpanded ? theme.palette.primary.main : '#0f172a',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ px: 3, pb: 2.5, pt: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#475569',
                      fontSize: '0.875rem',
                      lineHeight: 1.65,
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
