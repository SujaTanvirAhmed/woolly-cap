import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DashboardBody from '../DashboardBody';
import useLocal from '../../../hooks/useLocal';
import useGlobals from '../../../hooks/useGlobals';
import UnAuthorized from './UnAuthorized';
import DbError from '../../../components/DbError';
import Loader from '../../../components/loader/Loader';

export default function ManageProducts() {

    const { isLoggedIn, isAdmin } = useLocal();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login/sign-in");
        }
    }, [isLoggedIn, isAdmin, navigate]);

    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbError, setDbError] = React.useState(true);
    const [msg, setMsg] = React.useState('');
    const { SERVER_URL } = useGlobals();

    React.useEffect(() => {
        fetch(`${SERVER_URL}/products`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setIsLoading(false);
                setDbError(false);
            })
            .catch(err => {
                setDbError(true);
                setIsLoading(false);
                setMsg("Error loading products from DB!");
            });
    }, [SERVER_URL]);

    function handleProductDelete(productId) {
        fetch(`${SERVER_URL}/products/${productId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.reply === "FAILURE") {
        //         setMsg("DATABASE ERROR: Couldn't delete the product!");
        //     }
        //     if (data.reply === "SUCCESS") {
        //         const newProductsList = products.filter(pd => pd._id !== productId);
        //         setProducts(newProductsList);
        //     }
        // })
        // .catch();
    }

    return (
        <div>
            <DashboardBody />

            <Typography
                variant="h4"
                sx={{
                    marginTop: "200px",
                    marginBottom: "35px",
                    marginLeft: { md: "150px", xs: 0 }
                }}
            >Manage Products</Typography>

            {
                !isAdmin() ? <Box sx={{ marginLeft: { md: "70px" } }}>
                    <UnAuthorized />
                </Box> :
                    isLoading ? <Loader /> :
                        dbError ? <Box sx={{ marginLeft: { md: "150px" } }}>
                            <DbError message={msg} />
                        </Box> : <Container>
                            <Grid container spacing={2}
                                sx={{ flexGrow: 1, width: "85%", marginLeft: "250px" }}
                            >
                                {products.map(pd => (
                                    <Grid key={pd._id} item xs={12} md={4}
                                        sx={{ border: 1, borderRadius: 3, padding: 3, margin: "0px" }}>
                                        <Typography variant="h6">{pd.name}</Typography>
                                        <Typography variant="subtitle2">{pd.sub_title}</Typography>
                                        <Typography variant="body2">{pd.category}</Typography>
                                        <Typography variant="body2"
                                            sx={{ fontStyle: "italic" }}
                                        >BDT {pd.price}</Typography>
                                        <Box component="img" src={pd.img} alt="" sx={{ width: "100%" }} />
                                        <Button
                                            onClick={() => handleProductDelete(pd._id)}
                                            variant="contained"
                                            color="error"
                                            sx={{ marginTop: 2 }}
                                        >Delete</Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
            }
        </div >
    );
}