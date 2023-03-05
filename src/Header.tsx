import { Typography, Stack, Box, Container } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import theme from './theme';
import { Link } from 'react-router-dom';

const Header = ({colorMode}) => {
    return (
        <header>
            {/* <Container
                maxWidth={'xl'}
                disableGutters={true}
                sx={{
                    boxShadow: `0 0 10px 1px ${theme.palette.secondary.main}`,
                    backgroundColor: 'background.paper'
                }}
            > */}
                <Container
                    // maxWidth={'md'}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '5rem'
                    }}
                >
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Typography
                            variant='subtitle1'
                            sx={{
                                color: 'primary.main',
                                fontWeight: theme.typography.fontWeightBold
                            }}>
                            Where in the world?
                        </Typography>
                    </Link>
                    <Stack
                        direction="row"
                        alignItems='center'
                        spacing={0.5}
                        onClick={() => colorMode.toggleColorMode()}
                    >
                        <DarkModeOutlinedIcon sx={{ color: 'primary.main', fontWeight: 'normal', fontSize: '16px' }} />
                        <Typography
                            variant='caption'
                            sx={{
                                color: 'primary.text',
                                fontWeight: theme.typography.fontWeightMedium,
                                cursor: 'pointer'
                            }}>Dark Mode</Typography>
                    </Stack>
                </Container>
            {/* </Container> */}
        </header>
    )
}

export default Header