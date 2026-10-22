import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextFavoritos } from './ContextFavoritos';

export default function Favoritos() {
  const navigate = useNavigate();
  const { favoritos } = useContext(ContextFavoritos);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Favorites
      </Typography>

      {favoritos.length === 0 && (
        <Typography color="text.secondary">No favorite coins yet.</Typography>
      )}

      <Stack spacing={1}>
        {favoritos.map((coin) => (
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
            <Avatar src={coin.image} alt="" sx={{ width: 36, height: 36 }} />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography fontWeight={600} noWrap>
                {coin.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" textTransform="uppercase">
                {coin.symbol}
              </Typography>
            </Box>
            <Typography fontWeight={600}>
              ${coin.current_price}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}
