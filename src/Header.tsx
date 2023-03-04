import { Typography, Stack, Box, Container } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import theme from './theme';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
                <Container
                    maxWidth={false}
                    disableGutters={true}
                    sx={{
                        boxShadow: '0 0 10px 1px hsl(209deg 23% 22% / 14%)',
                    }}
                >
                <Container
                    maxWidth={'lg'}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '5rem'
                    }}
                    >
                    <Link to='/' style={{textDecoration: 'none'}}>
                    <Typography 
                        variant='subtitle1' 
                        sx={{ 
                            color: 'primary.main',
                            fontWeight: theme.typography.fontWeightBold }}>
                                Where in the world?
                    </Typography>
                    </Link>
                    <Stack 
                    direction="row"
                    alignItems='center'
                    spacing={0.5}
                    >
                    <DarkModeOutlinedIcon sx={{ color: 'primary.main', fontWeight: 'normal', fontSize: '16px' }}/>
                    <Typography
                        variant='caption' 
                        sx={{
                        color: theme.palette.primary.main,
                        fontWeight: theme.typography.fontWeightMedium}}>Dark Mode</Typography>
                    </Stack>
                </Container>
                </Container>
            </header>
  )
}

export default Header