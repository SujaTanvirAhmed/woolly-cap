import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import useLocal from '../../hooks/useLocal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import GoogleSignIn from './GoogleSignIn';
import SignUpForm from './SignUpForm';

export default function SignUp() {

    const { isLoggedIn } = useLocal();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (isLoggedIn()) {
            navigate("/dashboard");
        }
    }, [isLoggedIn, navigate]);

    return (
        <Box>
            <Container>
                <Grid container>
                    <Grid item
                        xs={12} md={4}
                        sx={{
                            borderRight: { xs: 0, md: 3 },
                            borderBottom: { xs: 3, md: 0 },
                            marginTop: 15
                        }}>
                        <GoogleSignIn />
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ paddingLeft: 5, paddingRight: 5 }}>
                        <SignUpForm />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}