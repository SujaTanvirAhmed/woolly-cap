import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardBody from '../DashboardBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import useLocal from '../../../hooks/useLocal';
import useGlobals from '../../../hooks/useGlobals';
import UnAuthorized from './UnAuthorized';

export default function AddProduct() {

    const { isLoggedIn, isAdmin } = useLocal();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login/sign-in");
        }
    }, [isLoggedIn, navigate]);

    const { SERVER_URL } = useGlobals();
    const initialProductState = {
        name: '',
        sub_title: '',
        category: '',
        img: '',
        price: 0,
        deleted: false
    };
    const [product, setProduct] = React.useState(initialProductState);
    const [response, setResponse] = React.useState('');

    const handleChange = (prop) => (event) => {
        setProduct({ ...product, [prop]: event.target.value });
    };

    function handleAddProductSubmit(event) {
        event.preventDefault();
        const dbProduct = {
            name: product.name,
            sub_title: product.sub_title,
            category: product.category,
            img: product.img,
            price: product.price,
            deleted: product.deleted
        };
        fetch(`${SERVER_URL}/add-product`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dbProduct)
        })
            .then(response => response.json())
            .then(data => {
                if (data.reply === "FAILURE") {
                    setResponse("Couldn't store product info into the database!");
                }
                else if (data.reply === "SUCCESS") {
                    setResponse("Product info successfully stored into the database!");
                    setProduct(initialProductState);
                }
            })
            .catch(err => setResponse(err.message));
    }

    function resetProductInfo() {
        setProduct(initialProductState);
        setResponse('');
    }

    return (
        <div>
            <DashboardBody />

            <Typography
                variant="h4"
                sx={{
                    marginTop: "200px",
                    marginBottom: "15px",
                    marginLeft: { md: "150px", xs: 0 }
                }}
            >Add a Product</Typography>

            {
                !isAdmin() ? <Box sx={{ marginLeft: { md: "70px" } }}>
                    <UnAuthorized />
                </Box> :
                    <Container>
                        <form onSubmit={handleAddProductSubmit}>

                            {response && <Typography
                                variant="body2"
                                style={{
                                    border: "1px solid darkgrey",
                                    display: "inline-block",
                                    padding: "3px 7px",
                                    borderRadius: "3px",
                                    marginBottom: "30px",
                                    marginTop: "10px",
                                    backgrounColor: "lightyellow",
                                    color: "blue"
                                }}
                            >Server response: {response}</Typography>}

                            <Typography variant="subtitle2"
                            >Enter following information to add a product to the database:</Typography>

                            <FormControl sx={{ m: 1, width: 300 }} variant="standard">
                                <InputLabel htmlFor="product-name">Product name:</InputLabel>
                                <Input
                                    type='text'
                                    id="product-name"
                                    value={product.name}
                                    onChange={handleChange('name')}
                                    required
                                />
                            </FormControl><br />

                            <FormControl sx={{ m: 1, width: 300 }} variant="standard">
                                <InputLabel htmlFor="product-subtitle">Subtitle:</InputLabel>
                                <Input
                                    type='text'
                                    id="product-subtitle"
                                    value={product.sub_title}
                                    onChange={handleChange('sub_title')}
                                    required
                                />
                            </FormControl><br />

                            <FormControl sx={{ m: 1, width: 300 }} variant="standard">
                                <InputLabel htmlFor="product-category">Category:</InputLabel>
                                <Input
                                    type='text'
                                    id="product-category"
                                    value={product.category}
                                    onChange={handleChange('category')}
                                    required
                                />
                            </FormControl><br />

                            <FormControl sx={{ m: 1, width: 300 }} variant="standard">
                                <InputLabel htmlFor="product-price">Price:</InputLabel>
                                <Input
                                    type='number'
                                    step="0.1"
                                    id="product-price"
                                    value={product.price}
                                    onChange={handleChange('price')}
                                    required
                                />
                            </FormControl><br />

                            <FormControl sx={{ m: 1, width: 300 }} variant="standard">
                                <InputLabel htmlFor="product-image">Image link:</InputLabel>
                                <Input
                                    type='text'
                                    id="product-image"
                                    value={product.img}
                                    onChange={handleChange('img')}
                                    required
                                />
                            </FormControl>

                            <br /><br />
                            <Button
                                type="submit"
                                variant="contained"
                                style={{ marginLeft: "10px", marginTop: "-3px" }}
                            >Add Product</Button>
                            <Button variant="text" onClick={resetProductInfo}>reset</Button>

                        </form>
                    </Container>
            }
        </div>

    );
}