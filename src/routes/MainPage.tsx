import { Container, InputAdornment, TextField, InputLabel, FormControl, Select, MenuItem, Box, Card, CardMedia, CardContent,Typography,Grid } from '@mui/material'
import { Form, useLoaderData } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import theme from '../theme';



export const MainPage = () => {
    const data = useLoaderData()
    const navigate = useNavigate()
    console.log(data)
    return (
        <Container  sx={{backgroundColor: 'background.default'}}>
            <Container  sx={{mt: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <Form>
                <TextField
                    variant='standard'
                    InputProps={{
                        sx: {
                            fontSize: '14px',
                            fontWeight: '600',
                            width: '25rem',
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
                <Box sx={{ width: 300 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-label" sx={{ fontSize: 17, left: '40px', top: '12px' }}>Filter by region</InputLabel>
                        <Select
                            onChange={(e) => navigate(`/regions/${e.target.value}`)}
                            variant='standard'
                            defaultValue=''
                            sx={{
                                boxShadow: `0 0 10px 1px ${theme.palette.secondary.main}`,
                                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                backgroundColor: 'none',
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
            <Grid container rowSpacing={8} justifyContent='space-between'  sx={{mt: '2rem', ml: 0}} >
                {data.map(item => (
                <Grid item xs={12} sm={4} md={4} lg={3} xl={3} display='flex' alignItems='center' justifyContent='center' pt={0}  >
                <Card 
                        sx={{ maxWidth: 280, boxShadow: `0 0 10px 1px ${theme.palette.secondary.main}`, minWidth: '250px', }} 
                        >
                    <CardMedia
                        sx={{cursor: 'pointer', boxShadow: `0 0 5px .5px ${theme.palette.secondary.main}`}}
                        onClick={() => navigate(`/${item.name.common}`)}
                        height={200}
                        component="img"
                        image={item.flags.svg}
                        alt="Paella dish"
                    />
                    <CardContent sx={{  pl: '1.5rem'}}>
                        <Typography variant="subtitle1" mb={1} lineHeight={1.1} fontWeight='fontWeightBold' color="text.primary" >
                            {item.name.common}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                        <Typography sx={{display: 'inline'}} variant="body2" fontWeight='fontWeightBold'>Population: </Typography>{item.population.toLocaleString("en-US")}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                        <Typography sx={{display: 'inline'}} variant="body2" fontWeight='fontWeightBold'>Region: </Typography>{item.region}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                        <Typography sx={{display: 'inline'}} variant="body2" fontWeight='fontWeightBold'>Capital: </Typography>{item.capital}
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
                ))}
            </Grid>
        </Container>
    )
}
