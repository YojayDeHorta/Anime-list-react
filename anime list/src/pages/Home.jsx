import { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { Box, Pagination, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [animes,setAnimes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page,setPage] = useState(Number(searchParams.get("page")));
    const navigate = useNavigate();

    useEffect(()=>{
        getData(1);
    },[])
    const getData = async (actualPage) => {
        try {
            const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity&page="+actualPage)
            const data = await response.json();
            console.log(actualPage);
            setAnimes(data.data);
            document.title = "Home Page";

        }catch (error) {console.log(error);} 
        finally {setLoading(false);}
    }
    const handlePageChange = (event, value) => {
        setPage(value);
        setAnimes([])
        getData(value)

    }
    return(
        <Box sx={{display:"flex",flexWrap:"wrap", alignItems:"center", justifyContent:"center"}}>
            <Box>
                {loading ? (
                    <div></div>
                ) : (
                    animes.map(anime =>(
                        <AnimeCard key={anime.mal_id} anime={anime}/>
                    ))
                    // <AnimeCard anime={animes[0]}/>
                )}
            </Box>
            
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",mb:5}}>
                <Typography>Page: {page}</Typography>
                <Pagination count={10} page={page} onChange={handlePageChange} />
            </Box>
            
        </Box>
        

    )
}