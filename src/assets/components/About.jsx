
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useContext } from 'react';
import { ContextAutor } from './ContextAutor';

export default function About() {
  const { autor } = useContext(ContextAutor);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: '0.14em' }}>
          About coins by {autor}
        </Typography>
        <Typography variant="h4" sx={{ mt: 0.5 }}>Market data, made simple.</Typography>
      </Box>
      <Paper variant="outlined" sx={{ p: { xs: 3, sm: 4 }, maxWidth: 720 }}>
        <CurrencyBitcoinIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
        <Typography variant="h6">A clearer view of crypto</Typography>
        <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.8 }}>
          Coins brings the leading cryptocurrencies together in one simple overview.
          Compare live prices, market capitalization, and daily performance at a glance.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Market data is provided by CoinGecko and shown in US dollars.
        </Typography>
      </Paper>
    </Stack>
  );
}
