// import theme from '../theme';
import Header from '../Header';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { useState, useMemo } from 'react'
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const restThemeParameters = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1440,
            xl: 1536,
        }
    },
    typography: {
        fontFamily: [
            'Nunito Sans',
            'sans-serif',
        ].join(','),
        fontWeightLight: '300',
        fontWeightMedium: '600',
        fontWeightBold: '800',
        fontWeightRegular: '300',
        // fontSize: 16,
        // htmlFontSize: 14
    },
}

const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            
            primary: {
                main: 'hsl(200, 15%, 8%)'
            },
            text: {
              primary: 'hsl(200, 15%, 8%)',
            },
            secondary: {
                main: 'hsl(209deg 23% 22% / 24%)',
            },
            background: {
                default: 'hsl(0, 0%, 98%)',
                paper: 'hsl(0, 0%, 100%)',
            },
            action: {
              hover: 'hsl(0, 0%, 98%)'
            }
          }
        : {
            // palette values for dark mode
            primary: {
                main: 'hsl(0, 0%, 100%)'
            },
            background: {
                default: 'hsl(207, 26%, 17%)',
                paper: 'hsl(209, 23%, 22%)',
            },
            text: {
              primary: 'hsl(0, 0%, 100%)',
            },
            action: {
              hover: 'hsl(207, 26%, 17%)'
            }
          }),
    },
    ...restThemeParameters,
  });

export const Root = () => {
    const [mode, setMode] = useState('light');
    const colorMode = useMemo(
        () => ({
          // The dark mode switch would invoke this method
          toggleColorMode: () => {
            setMode((prevMode) =>
              prevMode === 'light' ? 'dark' : 'light',
            );
          },
        }),
        [],
      );
      const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    return (
        <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header colorMode={colorMode}/>
            <Outlet />
        </ThemeProvider>
        </>
    )
}
