import ListAltIcon from '@mui/icons-material/ListAlt';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';

export default function AdminMenu() {

    const { pathname } = useLocation();

    const { signOutFirebase } = useFirebase();
    const navigate = useNavigate();

    function goManageOrders() {
        navigate("/dashboard/admin/manage-orders");
    }

    function goAddProduct() {
        navigate("/dashboard/admin/add-product");
    }

    function goMakeAdmin() {
        navigate("/dashboard/admin/make-admin");
    }

    function goManageProducts() {
        navigate("/dashboard/admin/manage-products");
    }
    const activeMenuStyle = {
        backgroundColor: "lightgrey",
        color: "black",
        fontWeight: "800"
    };
    return (
        <Box>

            <ListItem button onClick={goManageOrders}
                sx={pathname === "/dashboard/admin/manage-orders" ? activeMenuStyle : null}
            >
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Manage All Orders" />
            </ListItem>

            <ListItem button onClick={goManageProducts}
                sx={pathname === "/dashboard/admin/manage-products" ? activeMenuStyle : null}
            >
                <ListItemIcon>
                    <EmojiObjectsIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Products" />
            </ListItem>

            <ListItem button onClick={goAddProduct}
                sx={pathname === "/dashboard/admin/add-product" ? activeMenuStyle : null}
            >
                <ListItemIcon>
                    <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Add A Product" />
            </ListItem>



            <ListItem button onClick={goMakeAdmin}
                sx={pathname === "/dashboard/admin/make-admin" ? activeMenuStyle : null}
            >
                <ListItemIcon>
                    <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Make Admin" />
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