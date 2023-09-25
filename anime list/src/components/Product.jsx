import styled from "@emotion/styled";
import { Box, Paper, Typography, Button } from "@mui/material";

export default function Product() {
    const Img = styled("img", {
        width:200,
        height:200,
        objectfit:"cover",
        objectposition:"center",    
    })
    return(
        <Paper
        sx={{
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            gap: 2,
            mt:5,
        }}> 
            <img src="https://placehold.co/200" alt="" />
            <Box sx={{
                flexGrow:1,
                display: 'grid',
                gap: 4,
            }}>
                <Typography variant="h4"> Product name</Typography>
                <Typography variant="body1"> Product description</Typography>
                <Button variant="outlined" >
                    add cart
                </Button>
            </Box>
            <Box sx={{mr:2}} component="p">
                $19.99
            </Box>
        </Paper>
    )
}