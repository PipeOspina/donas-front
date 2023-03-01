import { PaletteOptions } from '@mui/material';
import { red } from '@mui/material/colors';
import { esES as coreEsES } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/x-date-pickers';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { Roboto } from '@next/font/google';

declare module '@mui/material/styles' {
  interface Palette {
    silver: Palette['primary'];
  }
  interface PaletteOptions {
    silver?: PaletteOptions['primary'];
  }
  interface PaletteColor {
    ultraLight?: string;
  }
  interface SimplePaletteColorOptions {
    ultraLight?: string;
  }
}

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
    ultraLight: '#CCE6D4',
  },
  secondary: {
    main: '#CD0111',
  },
  error: {
    main: red.A400,
  },
  silver: {
    main: 'rgba(0, 0, 0, 0.23)',
  },
};

const baseTheme = createTheme({
  palette,
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

// Create a theme instance.
const theme = createTheme(
  {
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
  },
  esES,
  coreEsES,
);

export default theme;
