import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import useLocal from '../../hooks/useLocal';
import AdminMenu from './AdminMenu';
import UserMenu from './UserMenu';

const drawerWidth = 250;

export default function DashboardBody() {

    const { isAdmin, isUser } = useLocal();
    const navigate = useNavigate();

    function goDashboard() {
        navigate("/dashboard");
    }

    return (
        <Box sx={{ display: 'flex' }}>

            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    marginTop: 8
                }}
            >
                <Toolbar>
                    {isAdmin() && (
                        <Typography variant="h6" noWrap component="div">
                            Admin Dashboard
                        </Typography>)
                    }

                    {isUser() && (
                        <Typography variant="h6" noWrap component="div">
                            User Dashboard
                        </Typography>)
                    }
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    <ListItem button onClick={goDashboard}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>

                    <Divider />

                    {isAdmin() && <AdminMenu />}

                    <Divider />

                    {isUser() && <UserMenu />}

                </List>
                <Divider />
            </Drawer>

        </Box>
    );
}