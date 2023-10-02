import { Box, Button, Drawer, AppBar, Toolbar, Typography, IconButton, TextField, useTheme, useMediaQuery } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SearchIcon from '@mui/icons-material/Search';
export default function Navbar({ navLinks }) {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [animeSearch, setAnimeSearch] = useState("")
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClick = () => {
        if (!animeSearch) Homepage();
        else navigate('/search/' + animeSearch, { token: '<new token>' });
    }
    function Homepage(){ 
        navigate('/')
        window.location.reload(); 
    }
    return (
        <>
            <AppBar position="static" sx={{ background: "#070720" }} >
                <Toolbar sx={{ minHeight: "70px!important ", display: "flex", justifyContent: "space-between" }} disableGutters>
                    {/* <IconButton color="inherit" size="large" onClick={() => setOpen(!open)} sx={{ display: { xs: "flex", sm: "none" } }} >
                        <MenuIcon />
                    </IconButton> */}
                    <Button variant="h5" sx={{ ml: isSmall?1:5,fontSize:isSmall?"15px":"20px",textTransform: 'none'}}  onClick={ Homepage } >
                        Anime&nbsp;<Box component="span" sx={{ color: "#E63334" }}>List</Box>
                    </Button>
                    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                        <Button color="inherit"  onClick={ Homepage } >Home</Button>
                    </Box>  
                    <Box >
                    {/* <Box sx={{ display: { xs: "none", sm: "block" } }}> */}
                        {/* {
                    navLinks.map((link,index)=>(
                      <Button color="inherit"component={NavLink} to={link.path} key={index}>{link.title}</Button>

                    ))
                } */}

                        {
                            // location.pathname?.substring(0, 7) == "/anime/" ?
                            //     <Button color="inherit" component={NavLink} to="/" startIcon={<KeyboardReturnIcon />}>Return</Button> :
                                <TextField id="standard-basic" variant="outlined" value={animeSearch} placeholder="Search..." sx={{ mr:5, background: "white", borderRadius: 2, width:isSmall?"190px":"250px" }}
                                    size="small" onChange={(newValue) => setAnimeSearch(newValue.target.value)}
                                    InputProps={{ endAdornment: <IconButton onClick={handleClick}> <SearchIcon /> </IconButton> }} />

                        }

                    </Box>

                </Toolbar>
            </AppBar>

            {/* <Button variant="container" onClick={()=>setOpen(true)}> open</Button> */}
            {/* <Drawer open={open} anchor="left" onClose={() => setOpen(false)} sx={{ display: { xs: "flex", sm: "none" } }}>
                <NavListDrawer navLinks={navLinks} setOpen={setOpen} />
            </Drawer> */}

        </>
    )
}