import * as React from 'react';
// import { useNavigate, Outlet } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';
import { Navigate, useLocation } from 'react-router-dom';
import useLocal from '../../hooks/useLocal';
// import AdminMenu from './AdminMenu';
// import UserMenu from './UserMenu';
import DashboardBody from './DashboardBody';
// const drawerWidth = 250;

export default function Dashboard() {

    // const { isLoggedIn, isAdmin, isUser } = useLocal();
    const { isLoggedIn } = useLocal();
    const location = useLocation();
    // const navigate = useNavigate();

    // function goDashboard() {
    //     navigate("/dashboard");
    // }

    return isLoggedIn() ? (
        <DashboardBody />
    ) : <Navigate to="/login/sign-in" state={{ from: location.pathname }} />;

}
