import { Box, Typography } from "@mui/material";

export default function InfoCard({title,content}) {
    return (
        <Box sx={{display:"flex", margin:'10px 0'}}>
            <Typography sx={{fontWeight:"bold",mr:1}} >{title}: </Typography>
            <Typography variant="p" component="p">{content}</Typography>
        </Box> 
    )
}