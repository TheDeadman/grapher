import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import {DrawerMenu} from '../drawerMenu/DrawerMenu';
import { useDispatch } from 'react-redux';
import { openDrawerMenu } from '../drawerMenu/drawerMenuSlice';

export default function ButtonAppBar() {
    const dispatch = useDispatch();
    return (
        <>
            {/* <Box sx={{ flexGrow: 1 }}> */}
            <DrawerMenu />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => dispatch(openDrawerMenu())}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Grapher
                    </Typography>
                    <Button color="inherit" onClick={() => navigator.clipboard.writeText(JSON.stringify(window.entryArray))}>Copy Performance Data</Button>
                </Toolbar>
            </AppBar>
            {/* </Box> */}
        </>
    );
}
