import React from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  useTheme,
} from '@mui/material';
import type { VentureData } from '../types';
import InteractiveMasterPlan from './InteractiveMasterPlan';

interface MasterPlanSectionProps {
  venture: VentureData;
}

export default function MasterPlanSection({ venture }: MasterPlanSectionProps) {
  const theme = useTheme();
  const cleanTitle = (venture.masterPlanTitle || 'Approved Layout & Plot Architecture')
    .replace(/\bDTCP\s*(&\s*)?/gi, '')
    .trim();

  return (
    <Box
      id="master-plan"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: '#ffffff',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
      }}
    >
      <Container>
        <Box sx={{ maxWidth: 760, mb: 4 }}>
          <Chip
            label={venture.masterPlanEyebrow || 'Master Layout Plan'}
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
            }}
          >
            {cleanTitle}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              fontSize: { xs: '0.95rem', sm: '1.025rem' },
              mt: 1.5,
              lineHeight: 1.6,
            }}
          >
            Explore the real-time interactive master plan. Pan, zoom, inspect individual plot dimensions, facing, and status in real-time.
          </Typography>
        </Box>

        {/* Live Interactive Master Plan */}
        <InteractiveMasterPlan venture={venture} />
      </Container>
    </Box>
  );
}
