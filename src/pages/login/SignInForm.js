import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, useLocation } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';
import useLocal from '../../hooks/useLocal';
import useGlobals from '../../hooks/useGlobals';

export default function SignInForm() {

    const { setLoggedIn, setRole } = useLocal();
    const { SERVER_URL } = useGlobals();

    const {
        signInUsingPassword,
        setTheUser,
    } = useFirebase();

    const loc = useLocation();
    const navigate = useNavigate();
    const productId = loc.state?.productId ? loc.state.productId : "";

    const initialState = {
        userEmail: '',
        userPassword1: '',
        showPassword: false,
    };
    const [values, setValues] = React.useState(initialState);
    const [error, setError] = React.useState('');

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    function resetValues() {
        setValues(initialState);
        setError('');
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function updateDbLogin(user_name, user_email, db_action) {
        const newDbUser = {
            name: user_name,
            email: user_email,
            action: db_action
        };

        fetch(`${SERVER_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newDbUser)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError('Cannot record in db');
                    setValues(initialState);
                } else if (data.user_role) {
                    setError('');
                    setValues(initialState);
                    // Local storage entry
                    setRole(data.user_role);//modify value if needed
                    if (productId) {
                        navigate("/purchase-product", { state: { productId } });
                    }
                    else {
                        const destination = loc.state?.from || "/dashboard";
                        navigate(destination);
                    }
                }
            })
            .catch(err => {
                setError("DATABASE CONNECTION ERROR: " + err.message);
            });
    }

    function handleSignInSubmit(event) {
        event.preventDefault();

        const email = values.userEmail.trim();
        const pass1 = values.userPassword1;

        if (email.length === 0) {
            setValues({ ...values, userEmail: "" });
            return;
        }

        setValues({
            ...values,
            userEmail: email
        });

        // Firebase action
        // handlePasswordSignIn(email, pass1);
        signInUsingPassword(email, pass1)
            .then(userCredential => {
                const theUser = userCredential.user;
                setTheUser(theUser);
                setError('');
                setLoggedIn();
                setRole("user");
                updateDbLogin(theUser.displayName, email, "LOGIN");
            })
            .catch(error => {
                setError(error.message);
            });
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 15 }}>

            <form onSubmit={handleSignInSubmit}>

                <Typography variant="h4">Sign-In</Typography>

                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <Input type="text" sx={{ visibility: 'hidden' }} />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="user-email">Email</InputLabel>
                    <Input
                        required
                        id="user-email"
                        type='email'
                        value={values.userEmail}
                        onChange={handleChange('userEmail')}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="user-password1">Password</InputLabel>
                    <Input
                        required
                        id="user-password1"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.userPassword1}
                        onChange={handleChange('userPassword1')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <div style={{ textAlign: "left" }}>
                    <Typography
                        variant="subtitle2"
                        sx={{ my: 2, marginLeft: 1 }}
                    >
                        New User? &nbsp;Then <Button
                            onClick={() => { navigate("/login/sign-up", { state: { from: loc.state?.from, productId: loc.state?.productId } }) }}
                        >Sign-Up / Register</Button>
                    </Typography>
                </div>

                <div style={{ textAlign: "left" }}>
                    <div>
                        {
                            error ? <p style={{ color: "red", backgroundColor: "lightyellow" }}>{error}</p> : null
                        }
                    </div>
                    <Typography variant="subtitle2">
                        <Button onClick={resetValues}>Reset Input</Button>
                    </Typography>
                </div>

                <FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={<SendIcon />}
                    >Log-In</Button>
                </FormControl>

            </form>
        </Box>
    );
}
