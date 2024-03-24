import { Grid, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '60vh',
      }}
    >
      <Grid>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}
