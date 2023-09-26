import { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { Box, Pagination, Typography, IconButton } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import SelectFilter from "../components/SelectFilter";
import DeleteIcon from '@mui/icons-material/Delete';
export default function Home() {
    let { name } = useParams();

    const [animes,setAnimes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters,setFilters] = useState({
        top_anime:"",
        type:"",
        rating:"",
        page:1,
    })
    const [deleteButton,setDeleteButton] = useState(true);
    useEffect(()=>{
        if (!name) {
            getAnimeList();
            return
        }
        console.log(name);

    },[name])
    const getAnimeList = async () => {
        try {
            let url = 'https://api.jikan.moe/v4/top/anime?'
            setAnimes([])
            if (filters.top_anime) url+=`filter=${filters.top_anime}&`
            if (filters.type) url+=`type=${filters.type}&`
            if (filters.rating) url+=`rating=${filters.rating}&`
            if (filters.page) url+=`page=${filters.page}&`
            const response = await fetch(url)
            const data = await response.json();
            setAnimes(data.data);
            document.title = "Home Page";
        }catch (error) {console.log(error);} 
        finally {setLoading(false);}
    }
    const handleFilterChange = filter => (event,value) => {
        filters[filter]= (filter=="page") ? value : event.target.value
        if (filter!="page")filters["page"]= 1
        setFilters({...filters})
        getAnimeList()
        setDeleteButton(false)
    }
    const resetFilters= () => {
        setFilters({
            top_anime:"",
            type:"",
            rating:"",
            page:1,
        })
        getAnimeList()
        setDeleteButton(true)
    }
    const searchAnimeList = anime => async ()=>{
        console.log(anime);
         const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
         const data = await response.json();
         console.log(data);
    }
    return(
        <Box>
            <Box sx={{display:"flex",flexWrap:"wrap", justifyContent:"left",alignItems:"center", gap:1,m:3}}>
                <FilterListIcon sx={{mr:1}} fontSize="large"/>Filter by: 
                {/* <SelectFilter filter={filters.top_anime} labelFilter="Filter by..." filterfunction={handleFilterChange("top_anime")}  
                    arrayItems={["bypopularity","airing","upcoming","favorite"]} size={150}/>> */}
                <SelectFilter filter={filters.top_anime} labelFilter="Filter by..." size={150} filterfunction={handleFilterChange("top_anime")}  
                    arrayItems={[{ name: 'None', value: '' },
                                { name: 'Popularity', value: 'bypopularity' },
                                { name: 'Airing now', value: 'airing' },
                                { name: 'Upcoming', value: 'upcoming' },
                                { name: 'Public favorites', value: 'favorite' }]} />
                <SelectFilter filter={filters.type} labelFilter="Type" size={100} filterfunction={handleFilterChange("type")}  
                    arrayItems={[{ name: 'None', value: '' },
                                { name: 'Tv', value: 'tv' },
                                { name: 'Movie', value: 'movie' },
                                { name: 'Ova', value: 'ova' },
                                { name: 'Special', value: 'special' },
                                { name: 'Ona', value: 'ona' },
                                { name: 'Music', value: 'music' }]} />
                <SelectFilter filter={filters.rating} labelFilter="Rating" size={200} filterfunction={handleFilterChange("rating")}  
                    arrayItems={[{ name: 'None', value: '' },
                                { name: 'G - All Ages', value: 'g' },
                                { name: 'PG - Children', value: 'pg' },
                                { name: 'PG-13 - Teens 13 or older', value: 'pg13' },
                                { name: 'R - 17+ violence ', value: 'r17' },
                                { name: 'R+ - Mild Nudity', value: 'r' },
                                { name: 'Rx - Adults Only', value: 'rx' }]} />
                <IconButton aria-label="delete" sx={{display: deleteButton ? "none" : "block"}} color="primary" onClick={resetFilters}>
                    <DeleteIcon />
                </IconButton>             
            </Box>
            
            <Box sx={{display:"flex",flexWrap:"wrap", justifyContent:"center"}}>
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
                <Typography>Page: {filters.page}</Typography>
                <Pagination count={10} page={filters.page} onChange={handleFilterChange("page")} />
            </Box>
            
        </Box>
        

    )
}