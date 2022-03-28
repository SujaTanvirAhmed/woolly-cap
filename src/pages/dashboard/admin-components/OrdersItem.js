import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useGlobals from '../../../hooks/useGlobals';
import Loader from '../../../components/loader/Loader';
import DbError from '../../../components/DbError';
import DeleteModal from './DeleteModal';

export default function OrdersItem({ email, productId, orderQty, orderId, orderStatus, handleOrderDelete }) {

    const [product, setProduct] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbError, setDbError] = React.useState(true);
    const [localOrderStatus, setLocalOrderStatus] = React.useState('');
    const { SERVER_URL } = useGlobals();


    React.useEffect(() => {
        fetch(`${SERVER_URL}/products/${productId}`)
            .then(resp => resp.json())
            .then(data => {
                setProduct(data);
                setIsLoading(false);
                setDbError(false);
            })
            .catch(() => {
                setIsLoading(false);
                setDbError(true);
            });
    }, [SERVER_URL, productId]);

    function handleMakeShipping() {
        fetch(`${SERVER_URL}/orders/ship/make/${orderId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId })
        })
            .then(() => {
                setLocalOrderStatus('SHIPPED');
                console.log("Order shipped");
            })
            .catch(() => console.log("Error in making an order shipped!"));
    }

    return (
        // <Box sx={{ margin: 5 }}>
        <Grid container sx={{ border: 1, borderRadius: 3, marginBottom: { xs: "10px", md: "15px" }, paddingBottom: { xs: 3 } }}>

            <Grid item xs={12} md={5}>
                <Box sx={{ padding: { md: 5, xs: 2 } }}>
                    <Box
                        component="img"
                        sx={{ width: "100%" }}
                        src={product.img}
                        alt={product.name}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={7}>

                <Box sx={{ paddingTop: 12 }}>

                    <Typography variant="subtitle1"
                        sx={{
                            textAlign: "center",
                            margin: 3, padding: 1,
                            border: 1
                        }}
                    >Order by: {email}, Status: {localOrderStatus || orderStatus.toUpperCase()}</Typography>

                    <Button
                        variant="contained"
                        color="success"
                        sx={{ marginBottom: 2 }}
                        onClick={handleMakeShipping}
                    >Ship</Button>
                    {/* <Button variant="contained" color="error" sx={{ marginLeft: 2, marginBottom: 2 }}>Delete</Button> */}
                    <Button
                        sx={{ marginBottom: 2, marginTop: -3 }}
                    >
                        <DeleteModal
                            orderId={orderId}
                            handleOrderDelete={handleOrderDelete}
                        />
                    </Button>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography sx={{ marginBottom: 1 }}>{product.sub_title}</Typography>
                    <Typography>{product.category}</Typography>
                    <Typography>Price: BDT {product.price}</Typography>
                    <Typography>Quantity ordered: {orderQty}</Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{ fontSize: "1.5rem" }}
                    >Order total: BDT {parseInt(orderQty) * parseFloat(product.price)}</Typography>

                    {/* <DeleteModal orderId={orderId} handleOrderDelete={handleOrderDelete} /> */}

                </Box>
            </Grid>
        </Grid>
        // </Box>
    );
}