import { Box, Button, Drawer, AppBar, Toolbar, Typography, IconButton, TextField } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SearchIcon from '@mui/icons-material/Search';
export default function Navbar({navLinks}) {
    const location = useLocation();
    const [open,setOpen]=useState(false);

    return (
        <>
            <AppBar position="static" color="primary" >
              <Toolbar sx={{minHeight:"50px!important "}} disableGutters>
                <IconButton color="inherit" size="large" onClick={()=>setOpen(!open)} sx={{display:{xs:"flex",sm:"none"}}} >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{flexGrow:1 ,ml:5}}>
                    Anime List 
                </Typography>

                <Box sx={{display:{xs:"none",sm:"block"}}}>
                {/* {
                    navLinks.map((link,index)=>(
                        <Button color="inherit"component={NavLink} to={link.path} key={index}>{link.title}</Button>
                        
                    ))
                } */}
                    

                {
                    location.pathname!="/"?
                    <Button color="inherit" component={NavLink} to="/" startIcon={<KeyboardReturnIcon />}>Return</Button>:
                    <TextField id="standard-basic" variant="outlined" placeholder='Search anime'sx={{background:"white",borderRadius:2,mr:5}} 
                    size="small" InputProps={{endAdornment: <IconButton > <SearchIcon /> </IconButton>}}/>

                }

                </Box>
                
              </Toolbar>
            </AppBar>

            {/* <Button variant="container" onClick={()=>setOpen(true)}> open</Button> */}
             <Drawer open={open} anchor="left" onClose={()=>setOpen(false)} sx={{display:{xs:"flex",sm:"none"}}}>
                <NavListDrawer navLinks={navLinks} setOpen={setOpen}/> 
            </Drawer> 

        </>
    )
}