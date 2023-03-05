import { createTheme } from '@mui/material/styles';



// A custom theme for this app
 const theme = createTheme({
    palette: {
        primary: {
            main: 'hsl(200, 15%, 8%)',
            dark: 'hsl(209, 23%, 22%)',
        },
        secondary: {
            main: 'hsl(209deg 23% 22% / 24%)',
        },
        background: {
            default: 'hsl(0, 0%, 98%)',
            paper: 'hsl(0, 0%, 100%)',
        },
        text: {
            primary: 'hsl(200, 15%, 8%)',    
        }
        
    },
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
});



export default theme;