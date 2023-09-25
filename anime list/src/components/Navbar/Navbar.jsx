import { Box, Button, Drawer, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";


export default function Navbar({navLinks}) {

    const [open,setOpen]=useState(false);

    return (
        <>
            <AppBar position="static" color="primary">
              <Toolbar>
                <IconButton color="inherit" size="large" onClick={()=>setOpen(!open)} sx={{display:{xs:"flex",sm:"none"}}} >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{flexGrow:1}}>
                    pagina web
                </Typography>

                <Box sx={{display:{xs:"none",sm:"block"}}}>
                {
                    navLinks.map((link,index)=>(
                        <Button color="inherit"component={NavLink} to={link.path} key={index}>{link.title}</Button>
                        
                    ))
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