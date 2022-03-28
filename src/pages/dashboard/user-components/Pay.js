import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import DashboardBody from '../DashboardBody';
import useLocal from '../../../hooks/useLocal';

export default function Pay() {

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
            >Pay</Typography>

            <Typography variant="h6" sx={{ marginLeft: { md: 15, xs: 0 }, marginTop: 10, marginBottom: 20 }}>Payment system coming soon ...</Typography>

        </div>
    );
}