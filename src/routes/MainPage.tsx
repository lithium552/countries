import { Container, InputAdornment, TextField, InputLabel, FormControl, Select, MenuItem, Box, Card, CardMedia, CardContent, Typography, Grid, Button } from '@mui/material'
import { Form, Link, useLoaderData } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material'
import { Data } from '../types';
import { useState, useRef, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface ErrorData {
    status: number
    message: string
    length: number
}


export const MainPage = () => {
    const data = useLoaderData() as Data[] | ErrorData
    const [index, setIndex] = useState(12)
    const [isLoading, setIsLoading] = useState(false)
    const theme = useTheme()
    const navigate = useNavigate()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const ref = useRef(true)

    const scrollEventListener = (e: any) => {
        if (ref.current) {
            if (window.innerHeight + e.target.scrollingElement.scrollTop > e.target.scrollingElement.scrollHeight - 100) {
                setIsLoading(true)
            }
        } 
    }
    const slicedData = (Array.isArray(data) ? [...data.slice(0, index)] : data) as Data[]

    useEffect(() => {
        if (isLoading) {
            document.removeEventListener('scroll', scrollEventListener)
            setTimeout(() => {
                setIndex(prev => prev + 12)
                setIsLoading(false)
            }, 1000)
        } else {
            document.addEventListener('scroll', scrollEventListener)
        }
    }, [isLoading])

    useEffect(() => {
        if (slicedData.length !== data.length) {
            ref.current = true
        } else {
            ref.current = false
        }
    }, [slicedData.length])

    return (
        <Container maxWidth='xl' sx={{ backgroundColor: 'background.default' }} >
            <Container maxWidth='lg' sx={{ mt: '2rem' }}>
                <Container
                    sx={
                        {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: matchesSm ? 'start' : 'end',
                            flexWrap: 'wrap'
                        }}>
                    <Form>
                        <TextField
                            variant='standard'
                            InputProps={{
                                sx: {
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    width: matchesMd ? 'auto' : '20rem',
                                    boxShadow: `0 0 10px 1px ${theme.palette.secondary.main}`,
                                    padding: '.5rem 1.5rem',
                                    borderRadius: '5px',
                                    backgroundColor: 'background.paper'
                                },
                                type: 'Search',
                                name: 'q',
                                id: 'q',
                                placeholder: 'Search for country...',
                                size: 'medium',
                                startAdornment: (
                                    <InputAdornment
                                        position='start'>
                                        <SearchOutlinedIcon
                                            sx={{ fontSize: '22px' }}
                                        />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                            }}
                        />
                    </Form>
                    <Box sx={{ width: 300, }}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label" sx={{ fontSize: 17, left: '40px', top: '12px' }}>Filter by region</InputLabel>
                            <Select
                                onChange={(e) => {
                                    navigate(`/regions/${e.target.value}`)
                                    setIndex(12)
                                }}
                                variant='standard'
                                defaultValue=''
                                sx={{
                                    boxShadow: `0 0 10px 1px ${theme.palette.secondary.main}`,
                                    '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                    height: '3rem',
                                    borderRadius: '5px',
                                    backgroundColor: 'background.paper'
                                }}
                                labelId="select-label"
                                disableUnderline={true}
                                inputProps={{
                                    sx: {
                                        fontWeight: '600',
                                    },
                                }}
                            >
                                <MenuItem value='Africa'>Africa</MenuItem>
                                <MenuItem value='America'>America</MenuItem>
                                <MenuItem value='Asia'>Asia</MenuItem>
                                <MenuItem value='Europe'>Europe</MenuItem>
                                <MenuItem value='Oceania'>Oceania</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Container>
                <Grid container rowSpacing={8}  justifyContent='space-between' sx={{ mt: '2rem', ml: 0 }} >
                    {Array.isArray(data) && slicedData.map((item: Data) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} display='flex' alignItems='center' justifyContent='center' pt={0} key={item.cca2} >
                            <Card
                                sx={{ maxWidth: 300, boxShadow: `0 0 10px 1px ${theme.palette.secondary.main}`,  flex: '1', }}
                            >
                            <Link to={`/${item.name.common}`} >
                                <CardMedia
                                    sx={{ cursor: 'pointer', boxShadow: `0 0 5px .5px ${theme.palette.secondary.main}` }}
                                    height={200}
                                    component="img"
                                    image={item.flags.svg}
                                    alt="flag ing"
                                />
                            </Link>
                                <CardContent sx={{ pl: '1.5rem' }}>
                                    <Typography variant="subtitle1" mb={1} lineHeight={1.1} fontWeight='fontWeightBold' color="text.primary" >
                                        {item.name.common}
                                    </Typography>
                                    <Typography sx={{ display: 'inline' }} variant="body2" fontWeight='fontWeightBold'>Population: </Typography>
                                    <Typography variant="body2" color="text.primary" sx={{ display: 'inline' }}>
                                        {item.population.toLocaleString("en-US")}
                                    </Typography>
                                    <Box display='flex' gap={.5}>
                                        <Typography variant="body2" fontWeight='fontWeightBold'>Region: </Typography>
                                        <Typography variant="body2" color="text.primary" >
                                            {item.region}
                                        </Typography>
                                    </Box>
                                    <Box display='flex' gap={.5}>
                                        <Typography variant="body2" fontWeight='fontWeightBold'>Capital: </Typography>
                                        <Typography variant="body2" color="text.primary">
                                            {item.capital}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    {!Array.isArray(data) && typeof data === 'object' && (
                        <Box m={'auto'}>
                            <Typography variant='h3'>{data.message}</Typography>
                        </Box>
                    )}
                    {isLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: '2rem', mb: '3rem' }}>
                            <CircularProgress />
                        </Box>
                    )}
                </Grid>
            </Container>
        </Container>
    )
}
