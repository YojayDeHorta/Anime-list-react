import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import './styles/card.css';
import { useNavigate } from 'react-router-dom';

export default function AnimeCard({ anime }) {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/anime/`+anime.mal_id; 
        navigate(path);
    }
    return (
        <Card className='card' sx={{ maxWidth: 225, maxHeight:350,margin:'2px' }} onClick={routeChange}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia className='animeimg' component="img" title="title" image={anime.images.jpg.image_url} sx={{ height: 250, width: 250 }} />
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.54)',
                    color: 'white',
                    padding: '5px',
                    fontSize:'11px'
                }}    >
                    <Typography gutterBottom variant="div" component="h2">
                        {anime.title}
                    </Typography>
                </Box>
            </Box>

        </Card>

    )
}