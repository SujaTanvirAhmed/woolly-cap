import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import DbError from '../../../components/DbError';
import useLocal from '../../../hooks/useLocal';
import useGlobals from '../../../hooks/useGlobals';
import OrdersItem from './OrdersItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DashboardBody from '../DashboardBody';
import UnAuthorized from './UnAuthorized';

export default function ManageOrders() {

    const { isLoggedIn, isAdmin } = useLocal();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login/sign-in");
        }
    }, [isLoggedIn, isAdmin, navigate]);

    const { SERVER_URL } = useGlobals();
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbError, setDbError] = React.useState(true);


    React.useEffect(() => {
        fetch(`${SERVER_URL}/orders`)
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
    }, [SERVER_URL]);

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
            >All Orders: {orders.length}</Typography>

            {
                !isAdmin() ? <Box sx={{ marginLeft: { md: "70px" } }}>
                    <UnAuthorized />
                </Box> :
                    isLoading ? <Loader /> :
                        dbError ? <Box sx={{ marginLeft: { md: "150px" } }}>
                            <DbError message="DB Error: error in loading orders!" />
                        </Box> : <Container>
                            <Box sx={{ marginLeft: { md: "165px", xs: 0 }, width: { md: "93%", xs: "100%" } }}>
                                {
                                    orders.map(ord =>
                                        <OrdersItem
                                            key={ord._id}
                                            email={ord.email}
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
            }
        </div>
    );
}