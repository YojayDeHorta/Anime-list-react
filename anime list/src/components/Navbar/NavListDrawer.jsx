import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import { NavLink } from "react-router-dom";

export default function NavListDrawer({navLinks,setOpen}) {
    return (
        <Box sx={{ width: 250 }}>
            {/* <nav>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="inbox" />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="drafts" />
                    </ListItem>
                </List>
            </nav>
            <Divider /> */}
            <nav>
                <List>
                    
                    {navLinks.map((link, index) => (
                        <ListItem key={index} disablePadding>
                            
                            <ListItemButton component={NavLink} to={link.path} onClick={()=>setOpen(false)}>
                            <ListItemIcon>
                                {link.icon}
                            </ListItemIcon>
                                <ListItemText primary={link.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    {/* <ListItem disablePadding>
                        <ListItemButton> 
                            <ListItemIcon component="a" href="#">
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemText primary="trash" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton> 
                            <ListItemIcon component="a" href="#">
                                <ErrorIcon />
                            </ListItemIcon>
                            <ListItemText primary="spam" />
                        </ListItemButton>
                    </ListItem> */}
                </List>
            </nav>
        </Box>
    )
}