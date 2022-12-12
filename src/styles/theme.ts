import { PaletteOptions } from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { Roboto } from '@next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const palette: PaletteOptions = {
  primary: {
    main: '#22B14C',
    contrastText: 'white',
  },
  secondary: {
    main: '#CD0111',
  },
  error: {
    main: red.A400,
  },
};

const baseTheme = createTheme({
  palette,
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

// Create a theme instance.
const theme = createTheme({
  ...baseTheme,
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-completed': {
            color: baseTheme.palette.primary.light,
          },
          '&.Mui-active': {
            color: baseTheme.palette.primary.dark,
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          '&.Mui-completed': {
            color: baseTheme.palette.primary.light,
          },
          '&.Mui-active': {
            color: baseTheme.palette.primary.dark,
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          '&.Mui-completed': {
            span: {
              borderColor: baseTheme.palette.primary.light,
              borderTopWidth: 2,
              borderRadius: 5,
            },
          },
          '&.Mui-active': {
            span: {
              borderColor: baseTheme.palette.primary.light,
              borderTopWidth: 2,
              borderRadius: 5,
            },
          },
        },
      },
    },
  },
});

export default theme;
