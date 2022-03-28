import ListIcon from '@mui/icons-material/List';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';

export default function UserMenu() {

    const { pathname } = useLocation();

    const { signOutFirebase } = useFirebase();
    const navigate = useNavigate();

    function goPay() {
        navigate("/dashboard/user/pay");
    }

    function goMyOrders() {
        navigate("/dashboard/user/my-orders");
    }

    function goReview() {
        navigate("/dashboard/user/review");
    }
    const activeMenuStyle = {
        backgroundColor: "lightgrey",
        color: "black",
        fontWeight: "800"
    };

    return (
        <Box>
            <ListItem button onClick={goMyOrders}
                sx={pathname === "/dashboard/user/my-orders" ? activeMenuStyle : null}
            >
                <ListItemIcon>
                    <ListIcon />
                </ListItemIcon>
                <ListItemText primary="My Orders" />
            </ListItem>

            <ListItem button onClick={goPay}
                sx={pathname === "/dashboard/user/pay" ? activeMenuStyle : null}
            >
                <ListItemIcon>
                    <AccountBalanceWalletIcon />
                </ListItemIcon>
                <ListItemText primary="Pay" />
            </ListItem>

            <ListItem button onClick={goReview}
                sx={pathname === "/dashboard/user/review" ? activeMenuStyle : null}
            >
                <ListItemIcon>
                    <RateReviewIcon />
                </ListItemIcon>
                <ListItemText primary="Review" />
            </ListItem>

            <ListItem button onClick={signOutFirebase}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </Box>
    );
}