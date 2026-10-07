import React from 'react';
import { Box, Container, Skeleton, Grid } from '@mui/material';

export default function MicrositeSkeleton() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafaf9' }}>
      {/* Top Navbar Skeleton */}
      <Box sx={{ height: 72, borderBottom: '1px solid #e2e8f0', px: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#ffffff' }}>
        <Skeleton variant="rounded" width={140} height={40} />
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Skeleton variant="text" width={60} height={24} />
          <Skeleton variant="text" width={60} height={24} />
          <Skeleton variant="text" width={60} height={24} />
          <Skeleton variant="text" width={60} height={24} />
        </Box>
        <Skeleton variant="rounded" width={130} height={40} />
      </Box>

      {/* Hero Section Skeleton */}
      <Box sx={{ height: '70vh', bgcolor: '#e2e8f0', position: 'relative', p: 4, display: 'flex', alignItems: 'flex-end' }}>
        <Container maxWidth="xl">
          <Skeleton variant="rounded" width={480} height={200} sx={{ borderRadius: 4, bgcolor: '#ffffff' }} />
        </Container>
      </Box>

      {/* Specs Badges Strip Skeleton */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Grid key={i} size={{ xs: 6, md: 2.4 }}>
              <Skeleton variant="rounded" height={110} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
