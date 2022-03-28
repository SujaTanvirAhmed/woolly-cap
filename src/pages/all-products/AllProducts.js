import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DbError from '../../components/DbError';
import Loader from '../../components/loader/Loader';
import useGlobals from '../../hooks/useGlobals';

export default function AllProducts() {

    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbError, setDbError] = React.useState(true);
    const { SERVER_URL } = useGlobals();
    const navigate = useNavigate();

    React.useEffect(() => {
        fetch(`${SERVER_URL}/products`)
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
        <div>
            <h1 style={{ marginTop: "100px", marginBottom: "50px" }}>All Products</h1>
            <Container>
                {isLoading ? <Loader /> :
                    (dbError ? <DbError message="DB Error in loading products!" /> : <Grid container spacing={8}>
                        {
                            products.map(pd => (
                                <Grid key={pd._id} item xs={12} md={4}>
                                    <Card sx={{ maxWidth: 345, boxShadow: 5, bgcolor: "#A5735C", color: "#ffffff", paddingBottom: 3 }}>
                                        <CardMedia
                                            component="img"
                                            alt=""
                                            image={pd.img}
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {pd.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="#88ff88"
                                            >
                                                {pd.sub_title}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="chartreuse"
                                            >
                                                {pd.category}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                color="#ffffff"
                                            >
                                                BDT {pd.price}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                style={{ margin: "auto", border: "2px solid white" }}
                                                sx={{ color: "#ffffff" }}
                                                onClick={() => goPurchaseProduct(pd._id)}
                                            >Purchase</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>)
                            )
                        }
                    </Grid>)
                }
            </Container>
        </div>
    );
}