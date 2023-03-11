import Container from "@mui/material/Container"
import { Button, CardContent, CardMedia, Typography, Box } from "@mui/material"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Card from "@mui/material/Card";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {useMediaQuery} from '@mui/material'
import { Data } from "../types";


const Country = () => {
    const [borderCountries, setBorderCountries] = useState([])
    const data = useLoaderData() as Data[]
    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        if (data[0]?.borders?.length) {
        fetch(`https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join()}`)
            .then(res => res.json())
            .then(data => {
                setBorderCountries(data.map((country: Data) => country.name.common))
            })
        }
    },[data[0]])
    console.log(data[0], borderCountries)
    const navigate = useNavigate()

  return (
    <Container maxWidth={'xl'}>
    <Container maxWidth={'xl'} sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
    <Button onClick={() => navigate(-1)} 
            variant="contained" 
            sx={{
                backgroundColor: 'background.paper',
                 color: 'primary.main',
                boxShadow: `0 0 10px 1px ${theme.palette.secondary.main}`,
                textTransform: 'capitalize',
                '&:hover': {backgroundColor: 'action.hover'}
            }}
                
                ><ArrowBackRoundedIcon sx={{marginRight: '.5rem', fontSize: '1rem'}}/>Back</Button>
    </Container>
    <Card 
        sx={!matchesMd 
            ? {display: 'flex', alignItems: 'center', mt: '2rem', backgroundColor: 'background.default', backgroundImage: 'none', boxShadow: 'none'}
            : {width: '100%', backgroundColor: 'background.default', mt: '2rem', boxShadow: 'none'}}>
        <CardMedia
            sx={{width: !matchesMd ? '40%': '100%', p: '1rem', flex: '1', }}
            component="img"
            // height="500"
            image={data[0].flags.svg}
            alt="green iguana"
        />
        <Box sx={{flex: '1'}}>
        <CardContent>
            <Typography variant="h4" fontWeight='fontWeightBold' color="text.primary">
                {data[0].name.official}
            </Typography>
            <Box display='flex' flexDirection={matchesSm ? 'column': 'row'} gap='2rem' m='2rem 0 4rem'>
            <Box>
            <Box display='flex' gap={1} mb='.5rem'>
                <Typography fontWeight='fontWeightBold'>Native name:</Typography>
                <Typography>
                {Object.values(Object.values(data[0].name.nativeName)[0])[0]}
                </Typography>
            </Box>
            <Box display='flex' gap={1} mb='.5rem'>
                <Typography fontWeight='fontWeightBold'>Population:</Typography>
                <Typography>
                {data[0].population.toLocaleString("en-US")}
                </Typography>
            </Box>
            <Box display='flex' gap={1} mb='.5rem'>
                <Typography fontWeight='fontWeightBold'>Region:</Typography>
                <Typography>
                {data[0].region}
                </Typography>
            </Box>
            <Box display='flex' gap={1} mb='.5rem'>
                <Typography fontWeight='fontWeightBold'>Sub Region:</Typography>
                <Typography>
                {data[0].subregion}
                </Typography>
            </Box>
            <Box display='flex' gap={1} mb='.5rem'>
                <Typography fontWeight='fontWeightBold'>Capital:</Typography>
                <Typography>
                {data[0].capital}
                </Typography>
            </Box>
            </Box>
            <Box>
            <Box display='flex' gap={1} mb='.5rem'>
                <Typography fontWeight='fontWeightBold'>Top level domain:</Typography>
                <Typography>
                {data[0].tld}
                </Typography>
            </Box>
            <Box display='flex' gap={1} mb='.5rem'>
                <Typography fontWeight='fontWeightBold'>Currencies:</Typography>
                <Typography>
                {Object.values(Object.values(data[0].currencies)[0])[0]}
                </Typography>
            </Box>
            <Box display='flex' gap={1} mb='.5rem'>
                <Typography fontWeight='fontWeightBold'>Languages:</Typography>
                <Typography>
                {Object.values(Object.values(data[0].languages)).join(', ')}
                </Typography>
            </Box>
            </Box>
            </Box>
        <Box sx={{display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap'}}>
        <Typography fontWeight='fontWeightBold'>Border Countries:</Typography>
        {borderCountries.map(country => (
            <Button 
                key={country}
                variant="contained" 
                sx={{backgroundColor: 'background.paper',
                    textTransform: 'capitalize',
                    color: 'primary.main',
                    '&:hover': {backgroundColor: 'action.hover'},
                    boxShadow: `0 0 10px 1px  ${theme.palette.secondary.main}`}}
                    onClick={() => {
                        navigate(`/${country}`)
                    }}>{country}</Button>
        ))}
        </Box>
        </CardContent>
        </Box>
    </Card>
    </Container>
  )
}

export default Country