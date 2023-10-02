import { useTheme } from '@emotion/react';
import { Box, Skeleton, Typography, useMediaQuery } from '@mui/material';
import Card from '@mui/material/Card';
export default function AnimeCard() {
    const theme = useTheme();
    const isxl= useMediaQuery(theme.breakpoints.up('xl'))
    const issm= useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Card   sx={{margin:"10px",width:isxl? 250:issm?130:180,height:isxl? 320:issm?180:250}} >
            <Box sx={{ position: 'relative' }}>
                <Skeleton variant="rectangular"  width={isxl? 250:issm?130:180} height={isxl? 320:issm?180:250}/>
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
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                    </Typography>
                </Box>
            </Box>

        </Card>

    )
}