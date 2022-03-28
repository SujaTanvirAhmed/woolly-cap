import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardBody from '../DashboardBody';
import useLocal from '../../../hooks/useLocal';
import useGlobals from '../../../hooks/useGlobals';
import useFirebase from '../../../hooks/useFirebase';
import MyOrdersItem from './MyOrdersItem';
import Loader from '../../../components/loader/Loader';
import DbError from '../../../components/DbError';

export default function MyOrders() {

    const { isLoggedIn, isUser } = useLocal();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login/sign-in");
        }
        else if (!isUser()) {
            navigate("/dashboard");
        }
    }, [isLoggedIn, isUser, navigate]);

    const { user } = useFirebase();
    const { SERVER_URL } = useGlobals();
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbError, setDbError] = React.useState(true);


    React.useEffect(() => {
        fetch(`${SERVER_URL}/orders/${user.email}`)
            .then(resp => resp.json())
            .then(data => {
                setOrders(data);
                setIsLoading(false);
                setDbError(false);
            })
            .catch(() => {
                setIsLoading(false);
                setDbError(true);
            });
    }, [SERVER_URL, user.email]);

    function handleOrderDelete(id) {
        const newOrders = orders.filter(ord => ord._id !== id);
        setOrders(newOrders);
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
            >My Orders: {orders.length}</Typography>
            {isLoading ? <Loader /> : (
                dbError ? <DbError message="DB Error in loading my orders!" /> :
                    <Container>
                        <Box sx={{ marginLeft: { md: "165px", xs: 0 }, width: { md: "93%", xs: "100%" } }}>
                            {
                                orders.map(ord =>
                                    <MyOrdersItem
                                        key={ord._id}
                                        productId={ord.productId}
                                        orderQty={ord.orderQty}
                                        orderId={ord._id}
                                        orderStatus={ord.status}
                                        handleOrderDelete={handleOrderDelete}
                                    />
                                )
                            }
                        </Box>
                    </Container>
            )
            }
        </div>
    );
}