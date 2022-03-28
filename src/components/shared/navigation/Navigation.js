import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useFirebase from '../../../hooks/useFirebase';
import useLocal from '../../../hooks/useLocal';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

export default function Navigation() {

    const { user, signOutFirebase } = useFirebase();
    const { isLoggedIn, isAdmin, isUser } = useLocal();
    const navigate = useNavigate();

    function goHome() {
        navigate("/");
    }
    function goAllProducts() {
        navigate("/all-products");
    }
    function goDashboard() {
        navigate("/dashboard");
    }
    function goLogin() {
        navigate("/login");
    }

    //User menu functions
    function goPay() {
        navigate("/dashboard/user/pay");
    }

    function goMyOrders() {
        navigate("/dashboard/user/my-orders");
    }

    function goReview() {
        navigate("/dashboard/user/review");
    }

    //Admin menu functions
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {Object.keys(user).length > 0 ?
                <MenuItem onClick={handleProfileMenuOpen}>
                    <Box>
                        <Badge
                            color="secondary"
                            anchorOrigin={{ vertical: "top", horizontal: "left" }}
                        >
                            <Avatar alt={user.displayName ? user.displayName : user.email} src={user?.photoURL} />
                        </Badge>
                        <Typography
                            variant="secondary"
                            sx={{ marginLeft: 1, marginRight: 1 }}
                        >{user.displayName ? user.displayName : user.email}</Typography><br />
                        <Button
                            variant="outlined"
                            sx={{ marginLeft: { xs: 4 }, marginTop: { xs: 2 } }}
                            onClick={signOutFirebase}>Logout</Button>
                    </Box>
                    <hr />
                </MenuItem> : null}
            <hr />
            <MenuItem onClick={goHome}>
                <IconButton size="small">Home</IconButton>
            </MenuItem>
            <hr />
            <MenuItem onClick={goAllProducts}>
                <IconButton size="small">All Products</IconButton>
            </MenuItem>
            {
                isLoggedIn() && <>
                    {/* User menu below */}
                    {isUser() && <>
                        <hr />
                        <MenuItem onClick={goMyOrders}>
                            <IconButton size="small">My Orders</IconButton>
                        </MenuItem>
                        <hr />
                        <MenuItem onClick={goPay}>
                            <IconButton size="small">Pay</IconButton>
                        </MenuItem>
                        <hr />
                        <MenuItem onClick={goReview}>
                            <IconButton size="small">Review</IconButton>
                        </MenuItem>
                    </>
                    }
                    {/* Admin menus below*/}
                    {isAdmin() && <>
                        <hr />
                        <MenuItem onClick={goManageOrders}>
                            <IconButton size="small">Manage All Orders</IconButton>
                        </MenuItem>
                        <hr />
                        <MenuItem onClick={goManageProducts}>
                            <IconButton size="small">Manage Products</IconButton>
                        </MenuItem>
                        <hr />
                        <MenuItem onClick={goAddProduct}>
                            <IconButton size="small">Add A Product</IconButton>
                        </MenuItem>
                        <hr />
                        <MenuItem onClick={goMakeAdmin}>
                            <IconButton size="small">Make Admin</IconButton>
                        </MenuItem>
                    </>
                    }
                </>
            }
            {
                !isLoggedIn() &&
                <MenuItem onClick={goLogin}>
                    <IconButton size="small">Login</IconButton>
                </MenuItem>
            }
        </Menu>
    );



    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="fixed">
                    <Toolbar>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' }, cursor: "pointer" }}
                            onClick={goHome}
                        >
                            WoollyCap
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button onClick={goHome} color="inherit">Home</Button>
                            <Button onClick={goAllProducts} color="inherit">All Products</Button>
                            {
                                isLoggedIn() &&
                                <Button onClick={goDashboard} color="inherit">Dashboard</Button>
                            }
                            {
                                !isLoggedIn() &&
                                <Button onClick={goLogin} color="inherit">Login</Button>
                            }
                            {Object.keys(user).length > 0 ? <Box sx={{ marginLeft: "20px" }}>
                                <Badge
                                    color="secondary"
                                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                                >
                                    <Avatar alt={user.displayName ? user.displayName : user.email} src={user?.photoURL} />
                                </Badge>
                                <Typography
                                    variant="secondary"
                                    sx={{ marginLeft: 1, marginRight: 1 }}
                                >{user.displayName ? user.displayName : user.email}</Typography>
                                <Button variant="outlined" onClick={signOutFirebase}>Logout</Button>
                            </Box> : null}
                        </Box>

                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </ThemeProvider>
        </Box>
    );
}
