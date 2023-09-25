import { Box, Container, IconButton, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
export default function App() {
  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}>
     <h1>app</h1>
     <Typography variant="h2" component="h2" >
        titulo 1
      </Typography>
      <Box sx={{border:2, p:5}}>waos</Box>
      <Button variant="contained" color='error'>
        primer boton
      </Button>
      <Button variant="outlined" color='success' startIcon={<AirportShuttleIcon />}>
        segundo boton
      </Button>
      <IconButton aria-label="delete" color="primary">
        <AirportShuttleIcon />
      </IconButton>
    </Container>
  )
}