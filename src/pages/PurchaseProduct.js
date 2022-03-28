import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import useFirebase from '../hooks/useFirebase';
import useGlobals from '../hooks/useGlobals';
import useLocal from '../hooks/useLocal';
import Loader from '../components/loader/Loader';
import DbError from '../components/DbError';

// This is protected page
export default function PurchaseProduct() {

    const { SERVER_URL } = useGlobals();
    const { isLoggedIn } = useLocal();
    const navigate = useNavigate();
    const loc = useLocation();
    const productId = loc.state?.productId;
    if (!productId) {
        navigate("/");
    } else {
        if (!isLoggedIn()) {
            navigate("/login/sign-in", { state: { productId } });
        }
    }
    const [product, setProduct] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbError, setDbError] = React.useState(true);

    React.useEffect(() => {
        fetch(`${SERVER_URL}/products/${productId}`)
            .then(resp => resp.json())
            .then(data => {
                setProduct(data);
                setDbError(false);
                setIsLoading(false);
            })
            .catch(() => {
                setDbError(true);
                setIsLoading(false);
            });
    }, [SERVER_URL, productId]);

    const { user } = useFirebase();
    const [mobile, setMobile] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [productQty, setProductQty] = React.useState(1);
    const [serverResponse, setServerResponse] = React.useState('');

    function handleMobileInput(event) {
        setMobile(event.target.value);
    }

    function handleAddressInput(event) {
        setAddress(event.target.value);
    }

    function handleProductQtyInput(event) {
        setProductQty(event.target.value);
    }

    function handleOrderSubmit(event) {
        event.preventDefault();
        const mobileNum = mobile.trim();
        const addressTxt = address.trim();
        if (mobileNum.length === 0) {
            setMobile('');
            return;
        }
        if (addressTxt.length === 0) {
            setAddress('');
            return;
        }

        const order = {
            name: user.displayName,
            email: user.email,
            mobile: mobile,
            address: address,
            productId: productId,
            orderQty: productQty,
            status: "pending"
        };

        fetch(`${SERVER_URL}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        })
            .then(response => response.json())
            .then(data => {
                if (data.reply === "FAILURE") {
                    setServerResponse("Error: failed to place your order. Please try again!");
                }
                else if (data.reply === "SUCCESS") {
                    setServerResponse("Your order has been placed successfully!");
                }
            })
            .catch(err => setServerResponse(err.message));
    }

    // const navigate = useNavigate();

    return (
        <Box>
            <Typography
                variant="h4"
                sx={{ marginTop: 12, marginBottom: 5 }}
            >Purchase</Typography>
            <Container>
                <Grid container spacing={8}>
                    <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                        <form onSubmit={handleOrderSubmit}>

                            <Typography
                                variant="subtitle2"
                                sx={{ padding: 3 }}
                            >{serverResponse}</Typography>

                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="user-name">Full name</InputLabel>
                                <Input
                                    required
                                    id="user-name"
                                    type='text'
                                    value={user.displayName}
                                    disabled
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="user-email">Email</InputLabel>
                                <Input
                                    required
                                    id="user-email"
                                    type='email'
                                    value={user.email}
                                    disabled
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="user-mobile">Mobile</InputLabel>
                                <Input
                                    required
                                    id="user-mobile"
                                    type='text'
                                    defaultValue={mobile}
                                    onChange={handleMobileInput}
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="user-address">Address</InputLabel>
                                <Input
                                    required
                                    id="user-address"
                                    type='text'
                                    defaultValue={address}
                                    onChange={handleAddressInput}
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="product-qty">Product Quantity</InputLabel>
                                <Input
                                    required
                                    id="product-qty"
                                    type='number'
                                    step="1"
                                    min="1"
                                    defaultValue={productQty}
                                    onChange={handleProductQtyInput}
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <Typography variant="subtitle2">Total: {productQty * product.price} BDT</Typography>
                            </FormControl>

                            <FormControl sx={{ marginTop: 3 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                >Place Order</Button>
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                        {
                            isLoading ? <Loader /> : (
                                dbError ? <DbError message="DB Error in loading this product!" /> : <>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            component="img"
                                            alt=""
                                            image={product.img}
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {product.sub_title}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                            >
                                                {product.category}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                color="text.primary"
                                            >
                                                BDT {product.price}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </>)
                        }
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}