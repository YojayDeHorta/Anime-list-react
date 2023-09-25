import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './styles/AnimeDetails.css';
import Characters from "../components/Characters";
import ReadMoreReact from 'read-more-react';
import Reviews from "../components/Reviews";
import InfoCard from "../components/InfoCard";
import InfoCardMulti from "../components/InfoCardMulti";
export default function AnimeDetails() {
    const [anime,setAnime] = useState({})
    const [loading,setLoading] = useState(true);
    const [showMore, setShowMore] = useState(false)
    
    let { id } = useParams();

    
    const getAnime = async(id) => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
            const data = await response.json();
            //   console.log(data.data);
            setAnime(data.data);
            document.title = data?.data?.title+' Details' ?? 'Details'
        }catch (error) {console.log(error);} 
        finally {setLoading(false);}
    }
    
    useEffect(() => {
        getAnime(id)
    },[])
    return (
        <Box>
            <Typography variant="h5" color="initial">{anime.title}</Typography>
            <Divider />
            <Grid container sx={{mt:2}}>
                <Grid item md={4} sm={12} xs={12}>
                    <Box sx={{display:"flex", justifyContent:"center"}}>
                        <img src={anime?.images?.jpg.image_url} alt="" />
                    </Box>
                    <Typography variant="h6" color="initial">Information</Typography>
                    <Divider />
                    
                    <InfoCard title={"Aired"} content={anime?.aired?.string}/>
                    <InfoCard title={"Year"} content={anime?.year}/>
                    <InfoCard title={"Type"} content={anime?.type}/>
                    <InfoCard title={"Status"} content={anime?.status}/>
                    <InfoCard title={"Episodes"} content={anime?.episodes}/>
                    <InfoCard title={"Duration"} content={anime?.duration}/>
                    <InfoCard title={"Rating"} content={anime?.rating}/>
                    <InfoCardMulti title={"Genres"} array={anime?.genres}/>
                    <InfoCardMulti title={"Licensors"} array={anime?.licensors}/>
                    <InfoCardMulti title={"Studios"} array={anime?.studios}/>
                    <InfoCardMulti title={"Themes"} array={anime?.themes}/>
                    
                    
                </Grid>
                <Grid item md={8} sm={12} xs={12}>
                    <Box sx={{display:"flex", margin: '20px 0'}}>
                        <Box sx={{marginLeft:'10px'}}>Score: <strong>{anime?.score}</strong></Box>
                        <Box sx={{marginLeft:'10px'}}>Ranked: <strong>{anime?.rank}</strong></Box>
                        <Box sx={{marginLeft:'10px'}}>Popularity  #<strong>{anime?.popularity}</strong> </Box>
                        <Box sx={{marginLeft:'10px'}}>Members: <strong>{anime?.members}</strong> </Box>
                    </Box>
                    <Typography variant="h6" color="initial">Synopsis</Typography>
                    <Divider />
                    {/* <p className="description">
                        {showMore ? anime.synopsis : anime.synopsis?.substring(0, 450) + '... '}
                        <Button sx={{padding:0}} variant="text" onClick={() => {
                            setShowMore(!showMore)
                        }}>{showMore ? 'Show Less': 'Read More'}</Button>
                    </p> */}
                    <ReadMoreReact key={anime.mal_id} text={""+anime.synopsis}  ideal={450} max={700} />
                        
                    <h3 className="title">Trailer</h3>
                    <Box sx={{display:"flex", justifyContent:"center"}}>

                        {anime?.trailer?.embed_url ? 
                            <iframe 
                                src={anime?.trailer?.url.replace('/watch?v=', '/embed/') } 
                                title="Inline Frame Example"
                                width="600"
                                height="350"
                                allowFullScreen>
                            </iframe> :
                            <h3>Trailer not available</h3>
                        }
                        
                    </Box>
                    <Characters id={id}/>
                    <Reviews id={id}/>
                </Grid>
            </Grid>
        </Box>
        
    )
}