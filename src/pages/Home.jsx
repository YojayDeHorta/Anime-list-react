import { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import AnimeCardSkeleton from "../components/AnimeCardSkeleton";
import { Box, Pagination, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import SelectFilter from "../components/SelectFilter";
import PreviewIcon from '@mui/icons-material/Preview';
import TvIcon from '@mui/icons-material/Tv';
import './styles/Home.css';

export default function Home() {
    let { nameanime } = useParams();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    let url = 'https://api.jikan.moe/v4/top/anime?'
    const [animes,setAnimes] = useState([]);
    const [popularAnimes,setPopularAnimes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [searchParams,setSearchParams] = useSearchParams();
    const [filters,setFilters] = useState({
        top_anime:searchParams.get("top_anime")||"",
        type:searchParams.get("type")||"",
        rating:searchParams.get("rating")||"",
        page:Number(searchParams.get("page"))||1,
    })
    const [maxPage,setMaxPage] = useState(1);
    useEffect(()=>{ 
       
        document.title = "Home Page";
        if (!nameanime) {
            getAnimeList();
            getPopularity();
            return
        }
        searchAnimeList();
    },[nameanime,searchParams])
    const getAnimeList = async () => {
        try {
            url = 'https://api.jikan.moe/v4/top/anime?'
            setAnimes([])
            if (filters.top_anime) url+=`filter=${filters.top_anime}&`
            if (filters.type) url+=`type=${filters.type}&`
            if (filters.rating) url+=`rating=${filters.rating}&`
            if (filters.page) url+=`page=${filters.page}&`
            const response = await fetch(url)
            const data = await response.json();
            setAnimes(data.data);
            setMaxPage(data.pagination.last_visible_page);
        }catch (error) {console.log(error);}
        finally {setLoading(false);}
    }
    const handleFilterChange = filter => (event,value) => {
        filters[filter]= (filter=="page") ? value : event.target.value
        if (filter!="page"){
            filters["page"]= 1
        }
        setSearchParams(filters)
        setFilters({...filters})
        getAnimeList()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          })

    }

    const searchAnimeList = async ()=>{
        try {
            setAnimes([])
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${nameanime}&order_by=popularity&sort=asc&sfw`);
            const data = await response.json();
            setAnimes(data.data);
            setMaxPage(data.pagination.last_visible_page);
        }catch (error) {console.log(error);}
        finally {setLoading(false);}
    }
    const getPopularity = async () =>{
        try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity')
        const data = await response.json();
        setPopularAnimes(data.data);
        }catch (error) {console.log(error);}
    }
    return(
        <Grid container spacing={0} sx={{mt:1}} className="containerPrincipal">
            <Grid item xs={nameanime?12:10}>
                <Box sx={{display:"flex",flexWrap:"wrap", justifyContent:"center"}}>
                    {loading ? (
                        [...Array(25)].map((x, i) =>(
                            <AnimeCardSkeleton key={i}/>
                        ))
                    ) : (
                        animes?.map(anime =>(
                            <AnimeCard key={anime.mal_id} anime={anime}/>
                        ))
                    )}
                </Box>

            </Grid >
            <Grid item xs={2}  className="filterClass" sx={{display:nameanime?"none":""}}>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <FilterListIcon  fontSize="large"/>
                    <SelectFilter filter={filters.top_anime} labelFilter="Filter by" size={150} filterfunction={handleFilterChange("top_anime")}
                        arrayItems={[{ name: 'None', value: '' },
                                    { name: 'Popularity', value: 'bypopularity' },
                                    { name: 'Airing now', value: 'airing' },
                                    { name: 'Upcoming', value: 'upcoming' },
                                    { name: 'Public favorites', value: 'favorite' }]} />
                </Box>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <TvIcon  fontSize="large"/>
                    <SelectFilter filter={filters.type} labelFilter="Type" size={150} filterfunction={handleFilterChange("type")}
                        arrayItems={[{ name: 'None', value: '' },
                                    { name: 'Tv', value: 'tv' },
                                    { name: 'Movie', value: 'movie' },
                                    { name: 'Ova', value: 'ova' },
                                    { name: 'Special', value: 'special' },
                                    { name: 'Ona', value: 'ona' },
                                    { name: 'Music', value: 'music' }]} />
                </Box>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <PreviewIcon  fontSize="large"/>
                    <SelectFilter filter={filters.rating} labelFilter="Rating" size={150} filterfunction={handleFilterChange("rating")}
                        arrayItems={[{ name: 'None', value: '' },
                                    { name: 'G - All Ages', value: 'g' },
                                    { name: 'PG - Children', value: 'pg' },
                                    { name: 'PG-13 - Teens 13', value: 'pg13' },
                                    { name: 'R - 17+ violence ', value: 'r17' },
                                    { name: 'R+ - Mild Nudity', value: 'r' },
                                    { name: 'Rx - Adults Only', value: 'rx' }]} />
                </Box>
                
                

                <Box sx={{display:"flex",flexWrap:"wrap", justifyContent:"center",mt:5}}>
                    <Typography variant="h7" sx={{color:"#E63334",fontWeight:"800"}} color="initial">
                        Popular Animes

                    </Typography>
                    {loading ? (
                        [...Array(4)].map((x, i) =>(
                            <AnimeCardSkeleton key={i}/>
                        ))
                    ) : (
                        popularAnimes?.slice(0, 4).map(anime =>(
                            <AnimeCard key={anime.mal_id} anime={anime}/>
                        ))
                    )}
                </Box>
            </Grid>
            <Grid item xs={12} sx={{display:"flex",flexDirection:"column",alignItems:"center",mb:5, mt:5}}>
                    <Typography>Page: {filters.page}</Typography>
                    <Pagination count={maxPage} page={filters.page} onChange={handleFilterChange("page")} color="secondary" variant="outlined" shape="rounded" size={isSmall?"small":""} />
            </Grid>
        </Grid>



    )
}