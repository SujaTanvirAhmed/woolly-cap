import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DbError from '../../components/DbError';
import Loader from '../../components/loader/Loader';
import useGlobals from '../../hooks/useGlobals';


export default function DisplayProducts() {

    const navigate = useNavigate();

    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbError, setDbError] = React.useState(true);
    const { SERVER_URL } = useGlobals();

    React.useEffect(() => {
        fetch(`${SERVER_URL}/display-products`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setIsLoading(false);
                setDbError(false);
            })
            .catch(err => {
                setIsLoading(false);
                setDbError(true);
            });
    }, [SERVER_URL]);

    function goPurchaseProduct(productId) {
        navigate("/purchase-product", { state: { productId } });
    }

    return (
        <React.Fragment>
            <Typography
                variant="h4"
                sx={{ marginBottom: 3, marginTop: 8 }}
            >Popular Products</Typography>
            {
                isLoading ? (<Loader />) : (

                    dbError ? (
                        <DbError message="DB Error in loading popular products!" />
                    ) : (<Box>
                        <Grid container>
                            {
                                products.map(
                                    product => (
                                        <Grid item xs={12} md={4} key={product._id}>
                                            <Stack sx={{ border: 1, borderRadius: 3, padding: 2, margin: 1 }}>
                                                <Typography variant="h6">{product.name}</Typography>
                                                <Typography>{product.sub_title}</Typography>
                                                <Box
                                                    component="img"
                                                    src={product.img}
                                                    alt=""
                                                // sx={{width}}
                                                />
                                                <Typography style={{ marginTop: "5px" }}>BDT {product.price}</Typography>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    style={{ margin: "auto", marginTop: "10px" }}
                                                    onClick={() => goPurchaseProduct(product._id)}
                                                >Purchase</Button>
                                            </Stack>
                                        </Grid>
                                    )
                                )
                            }
                        </Grid>
                    </Box>)

                )
            }
        </React.Fragment>
    );
}