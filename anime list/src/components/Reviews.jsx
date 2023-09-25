import { Box, Divider, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ReadMoreReact from 'read-more-react';
import './styles/Reviews.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

export default function Reviews({id}) {
    const [Reviews,setReview] = useState([])
    const [loading,setLoading] = useState(true);

    const getReviews = async(id) => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/reviews`)
            const data = await response.json();
            //  console.log(data.data);
             setReview(data.data);
        }catch (error) {console.log(error);} 
        finally {setLoading(false);}
    }
    useEffect(() => {
        getReviews(id)
    },[])
    return (
        <Box>
            <h1>Reviews</h1>
            <Divider />
            
            {
                Reviews?.slice(0, 10).map((review,index) => (
                    
                    <Box key={index} sx={{mt:1}}>
                        <Box  sx={{display:'flex'}}>
                            <Box sx={{mr:2}}>
                                <img src={review?.user?.images?.jpg?.image_url} alt="" className='userImg'/>
                            </Box>
                            <Box>
                                <Box >
                                    <strong>{review?.user?.username}</strong>
                                </Box>
                                <Box sx={{display:'flex',mt:2,mb:2}} >
                                    {
                                        review?.tags[0] === "Recommended"?
                                        <ThumbUpIcon fontSize="small" sx={{color:'#9fbdff'}} />
                                        :review?.tags[0] === "Mixed Feelings"?
                                        <ThumbsUpDownIcon sx={{color:'#a3a3a3'}} fontSize="small"/>
                                        :<ThumbDownIcon sx={{color:'#ff9fa1'}} fontSize="small"/>
                                    }
                                    &nbsp; {review?.tags[0]}
                                </Box>
                                <Box className="textComments">
                                    <ReadMoreReact key={review?.mal_id} text={""+review?.review}  ideal={450} max={700} />
                                </Box>
                            </Box>
                            
                        </Box>
                        <Divider sx={{mt:3,mb:3}}/>
                    </Box>
                ))
            }
            
        </Box>
    )
}