import { Typography, Stack, Box, Container } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import { useMediaQuery } from '@mui/material'


const Header = ({ colorMode }) => {
    const theme = useTheme()
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Container
            maxWidth='xl'
            sx={{
                boxShadow: `0 0 10px 1px ${theme.palette.secondary.main}`,
                backgroundColor: 'background.paper',
                mr: '0',
                ml: '0'
            }}
        >
            <Container>
                <Container
                    maxWidth='lg'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '5rem',
                    }}
                >
                    <Box sx={{ display: 'flex', gap: matchesSm ? '' : '1rem', flexDirection: matchesSm ? 'column' : 'row' }}>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    color: 'primary.main',
                                    fontWeight: 'fontWeightBold',
                                }}>
                                Where in the world?
                            </Typography>
                        </Link>
                        <Link to='/pages/all' style={{ textDecoration: 'none' }}>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    color: 'primary.main',
                                    fontWeight: 'fontWeightBold'
                                }}>
                                With pagination?
                            </Typography>
                        </Link>
                    </Box>
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
                                fontWeight: 'fontWeightMedium',
                                cursor: 'pointer'
                            }}>Dark Mode</Typography>
                    </Stack>
                </Container>
            </Container>
        </Container>
    )
}

export default Header