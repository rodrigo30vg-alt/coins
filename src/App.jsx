import Layout from './assets/components/Layout';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AutorProvider } from './assets/components/AutorProvider';
import { FavoritosProvider } from './assets/components/FavoritosProvider';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#176b5b',
      dark: '#105345',
      light: '#e6f3ef',
    },
    background: {
      default: '#f6f8fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#172b4d',
      secondary: '#66758a',
    },
    success: {
      main: '#16845b',
    },
    error: {
      main: '#c34444',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.04em',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

function App() {
  return (
    <AutorProvider>
      <FavoritosProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout> </Layout>
        </BrowserRouter>
        </ThemeProvider>
      </FavoritosProvider>
    </AutorProvider>
  );
}

export default App