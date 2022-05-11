// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#000000',
      light: '#000000',
      dark: '#000000',
    },
    secondary: {
      main: '#000000',
      light: '#000000',
      dark: '#000000',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: '#000000',
      hint: '#000000',
    },
  },
  typography: {
    fontFamily: 'ITC',
  },
  shape: {
    borderRadius: 0,
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
};