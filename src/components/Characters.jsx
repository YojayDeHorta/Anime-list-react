import { Box, Divider, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./styles/Characters.css"
export default function Characters({id}) {
    const [characters, setCharacters] = useState([])
    const [loading,setLoading] = useState(true);

    const getCharacters= async(id) => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)
            const data = await response.json();
             //console.log(data.data[0]);
            setCharacters(data.data);
        }catch (error) {console.log(error);} 
        finally {setLoading(false);}
    }
    useEffect(() => {
        getCharacters(id)
    },[])
    return (
        <Box>
            <h1>Characters</h1>
            <Divider />
            <Box sx={{display:"flex",flexWrap:"wrap",gap:1, justifyContent:"center"}}>
            {loading ? (
                [...Array(10)].map((x, i) =>(
                    <Skeleton variant="rectangular" width={300} height={82} key={i}/>
                ))
            ) : (
                characters?.slice(0, 10).map((character,index) => (
                    <Paper  elevation={0}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt:1,
                            width:"49%",
                            minWidth:300
                        }} key={index}> 
                            <Box sx={{display:"flex", }}>
                                <img className="imgActors" src={character?.character?.images?.webp?.image_url} alt={character?.character?.name} loading="lazy"/>
                                <Box className="charactersBox">
                                    <strong>{character?.character?.name}</strong>
                                    <p>{character?.role}</p>
                                </Box>
                            </Box>
                            <Box sx={{display:"flex"}}>
                                <Box sx={{mr:2}} className="charactersBox">
                                        <strong >{character?.voice_actors[0]?.person?.name}</strong>
                                    <Typography component="p" variant="p" sx={{textAlign:"right"}}>japanese</Typography>
                                </Box>

                                <img className="imgActors" src={character?.voice_actors[0]?.person?.images.jpg.image_url} alt={character?.voice_actors[0]?.person?.name} loading="lazy"/>
                            </Box>
                            

                    </Paper>
                ))
                )}
            </Box>
        </Box>
    )
}