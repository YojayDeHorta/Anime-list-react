import { Box, Typography } from "@mui/material";

export default function InfoCardMulti({title,array}) {
    return (
        <Box sx={{display:"flex", margin:'10px 0'}}>
            <Typography sx={{fontWeight:"bold",mr:1}} >{title}: </Typography>
            <Typography variant="p" component="p">
                {
                    array?.map((genre,index) => {
                        return genre.name+(array?.length==index+1 ? "" : ", ");
                    })
                }
            </Typography>
        </Box>
    )
}