import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/Star';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Favoritos from './Favoritos';
import { Detail, CoinDetailProvider } from './detail';
import { AutorProvider } from './AutorProvider';
import { ContextAutor } from './ContextAutor';
import { useContext } from 'react';

const drawerWidth = 240;

export default function Layout() {
  const { autor } = useContext(ContextAutor);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const closeDrawer = () => setOpen(false);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="sticky"
        elevation={0}
        color="inherit"
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Toolbar sx={{ maxWidth: 1280, width: '100%', mx: 'auto', px: { xs: 2, sm: 3 } }}>
          <IconButton
            color="primary"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{ mr: 1.5 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ color: 'text.primary', flexGrow: 1 }}>
            Coins by {autor}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={closeDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            p: 2,
          },
        }}
      >
        <Box sx={{ px: 1, py: 2 }}>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.12em' }}>
            Navigation
          </Typography>
        </Box>
        <List>
          {[
            { label: 'Markets', path: '/', icon: <HomeRoundedIcon /> },
            { label: 'Favorites', path: '/favoritos', icon: <StarIcon /> },
            { label: 'About', path: '/about', icon: <InfoOutlinedIcon /> },
          ].map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  closeDrawer();
                }}
                sx={{ borderRadius: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/detail/:id" element={ <CoinDetailProvider> <Detail /> </CoinDetailProvider> } />
        </Routes>
      </Container>
    </Box>
  );
}