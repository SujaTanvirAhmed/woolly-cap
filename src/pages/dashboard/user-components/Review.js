import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardBody from '../DashboardBody';
import ReviewBody from './ReviewBody';
import Box from '@mui/material/Box';
import useLocal from '../../../hooks/useLocal';

export default function Review() {

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
        <Box>
            <DashboardBody />
            <h1 style={{ marginTop: "200px" }}>Review</h1>
            <ReviewBody />
        </Box>
    );
}