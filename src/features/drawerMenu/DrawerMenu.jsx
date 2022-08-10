import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { closeDrawerMenu, selectIsDrawerOpen } from './drawerMenuSlice';

export const DrawerMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector(selectIsDrawerOpen);
    return (
        <>
            <Drawer
                anchor={'left'}
                open={isDrawerOpen}
                onClose={() => dispatch(closeDrawerMenu())}
                transitionDuration={100}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => dispatch(closeDrawerMenu())}
                    onKeyDown={() => dispatch(closeDrawerMenu())}
                >
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/')}>
                                <ListItemIcon>
                                    <WaterfallChartIcon sx={{ transform: 'rotateZ(90deg)' }} />
                                </ListItemIcon>
                                <ListItemText primary={"Graphs"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/list')}>
                                <ListItemIcon>
                                    <FormatListNumberedIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Graph Entries"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    {/* <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List> */}
                </Box>
            </Drawer>
        </>
    )
}