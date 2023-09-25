import { CardActions, CardContent, CardMedia, Typography, Button, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';

export default function Cards() {
    return (
        <Card sx={{
            mt:5,
          }}>
            <CardMedia component="img" image='https://placehold.co/1000x200' height='200' />
            <CardContent>
                <Typography variant="h6" >Card Title</Typography>
                <Typography variant="body2" component="p" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt porro autem saepe delectus obcaecati, ut aliquid necessitatibus rem quaerat praesentium, repellat labore, temporibus non ipsa pariatur voluptatem voluptate eius harum!</Typography>
                <CardActions>
                    <Button variant="contained" >Add</Button>
                    <Button color="error">Remove</Button>
                </CardActions>
            </CardContent>
            
        </Card>
    )
}