import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 8,
});

export default function Home() {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load coin prices. Please try again later.');
        }

        return response.json();
      })
      .then(setCoins)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load coin prices.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Coins
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress aria-label="Loading coin prices" />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Stack spacing={1}>
          {coins.map((coin) => (
            <Paper
              key={coin.id}
              onClick={() => navigate("/detail/" + coin.id)}
              variant="outlined"
              sx={{
                px: { xs: 1.5, sm: 2 },
                py: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Avatar
                src={coin.image}
                alt=""
                imgProps={{ loading: 'lazy' }}
                sx={{ width: 36, height: 36 }}
              />
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography fontWeight={600} noWrap>
                  {coin.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" textTransform="uppercase">
                  {coin.symbol}
                </Typography>
              </Box>
              <Typography fontWeight={600} sx={{ textAlign: 'right', flexShrink: 0 }}>
                {usdFormatter.format(coin.current_price)}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
