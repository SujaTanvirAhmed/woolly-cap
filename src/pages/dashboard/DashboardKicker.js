import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import useLocal from '../../hooks/useLocal';

export default function DashboardKicker() {

    const navigate = useNavigate();
    const { isLoggedIn, isAdmin, isUser } = useLocal();

    React.useEffect(() => {
        if (isLoggedIn() && isAdmin()) {
            navigate("/dashboard/admin");
        }
        else if (isLoggedIn() && isUser()) {
            navigate("/dashboard/user");
        }
        else {
            navigate("/login/sign-in");
        }
    }, [navigate, isLoggedIn, isAdmin, isUser]);

    return (
        <div style={{ marginTop: "150px" }}>
            <h1>Dashboard Kicker</h1>
        </div>
    );
}