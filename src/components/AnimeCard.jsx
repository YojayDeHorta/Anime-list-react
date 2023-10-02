import { Box, CardMedia, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import './styles/AnimeCard.css';
import { useNavigate } from 'react-router-dom';

export default function AnimeCard({ anime }) {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/anime/`+anime.mal_id; 
        navigate(path);
    }
    return (
        <Card className='animeCard'  onClick={routeChange}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia className='animeimg' component="img" loading="lazy" title={anime.title} image={anime.images.jpg.image_url}  />
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.54)',
                    color: 'white',
                    padding: '5px',
                    fontSize:'9px'
                }}    >
                    <Typography gutterBottom variant="div" component="h2" className='animeTitle'>
                        {anime.title}
                    </Typography>
                </Box>
            </Box>

        </Card>

    )
}