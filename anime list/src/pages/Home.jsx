import { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { Box } from "@mui/material";
export default function Home() {
    const [animes,setAnimes] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        getData();
    },[])
    const getData = async () => {
        try {
            const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity")
            const data = await response.json();
            console.log(data.data[0]);
            setAnimes(data.data);
        }catch (error) {console.log(error);} 
        finally {setLoading(false);}
    }
    return(
        <Box sx={{display:"flex",flexWrap:"wrap", alignItems:"center", justifyContent:"center"}}>
            
            {loading ? (
                <div></div>
              ) : (
                animes.map(anime =>(
                    <AnimeCard key={anime.mal_id} anime={anime}/>
                ))
                // <AnimeCard anime={animes[0]}/>
            )}
        </Box>
        

    )
}