import * as React from 'react';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
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

export default function SignUpForm() {

    const navigate = useNavigate();
    const loc = useLocation();
    const destinationPath = loc.state?.from || "/dashboard";
    const productId = loc.state?.productId ? loc.state.productId : "";

    const {
        signUpUsingPassword,
        updateUserName,
        setTheUser
    } = useFirebase();

    const initialState = {
        userFullName: '',
        userEmail: '',
        userPassword1: '',
        userPassword2: '',
        showPassword: false,
        showPassword2: false
    };

    const { setLoggedIn, setRole } = useLocal();
    const { SERVER_URL } = useGlobals();
    const [error, setError] = React.useState('');
    const [values, setValues] = React.useState(initialState);

    function updateDbSignUp(user_name, user_email, db_action) {
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
                if (data.msg === "REGISTER_FAIL") {
                    setError('DATABASE ERROR: Cannot record in db');
                    setValues(initialState);
                } else if (data.msg === "REGISTER_OK") {
                    setError('');
                    setValues(initialState);
                    if (productId) {
                        navigate("/purchase-product", { state: { productId } });
                    }
                    else {
                        navigate(destinationPath);
                    }
                }
            })
            .catch(err => {
                setError("DATABASE CONNECTION ERROR: " + err.message);
            });
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    function resetValues() {
        setValues(initialState);
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowPassword2 = () => {
        setValues({
            ...values,
            showPassword2: !values.showPassword2,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };

    function handleSignUpSubmit(event) {

        event.preventDefault(); // Preventing page reload

        const name = values.userFullName.trim();
        const email = values.userEmail.trim();
        const pass1 = values.userPassword1;
        const pass2 = values.userPassword2;

        if (name.length === 0) {
            setValues({ ...values, userFullName: "" });
            const errorMsg = "Enter your full name";
            setError(errorMsg);
            return;
        }

        if (email.length === 0) {
            setValues({ ...values, userEmail: "" });
            const errorMsg = "Enter your email";
            setError(errorMsg);
            return;
        }

        if (pass1 !== pass2) {
            const errorMsg = "Password mismatch";
            setError(errorMsg);
            return;
        }

        if (pass1.length < 6) {
            const errorMsg = "Password must be at least 6 characters long";
            setError(errorMsg);
            return;
        }
        // After input validation
        // Firebase record code
        signUpUsingPassword(email, pass1)
            .then(userCredential => {
                const user = userCredential.user;
                updateUserName(name);
                setTheUser(user);
                setLoggedIn();
                setRole("user");
                updateDbSignUp(name, email, "REGISTER");
            })
            .catch(error => setError("SIGN-UP ERROR: " + error.message));
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 15 }}>

            <form onSubmit={handleSignUpSubmit}>

                <Typography variant="h4">Sign-Up</Typography>

                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="user-name">Full name</InputLabel>
                    <Input
                        required
                        id="user-name"
                        type='text'
                        value={values.userFullName}
                        onChange={handleChange('userFullName')}
                    />
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

                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="user-password2">Re-type password</InputLabel>
                    <Input
                        required
                        id="user-password2"
                        type={values.showPassword2 ? 'text' : 'password'}
                        value={values.userPassword2}
                        onChange={handleChange('userPassword2')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword2}
                                    onMouseDown={handleMouseDownPassword2}
                                >
                                    {values.showPassword2 ? <VisibilityOff /> : <Visibility />}
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
                        Already Registered? &nbsp;Then <Button
                            onClick={() => { navigate("/login/sign-in", { state: { from: loc.state?.from, productId: loc.state?.productId } }) }}
                        >Sign-In / Log-In</Button>
                    </Typography>
                </div>

                <div style={{ textAlign: "left" }}>
                    <div>
                        {
                            error ? <p style={{ color: "red", backgroundColor: "lightyellow" }}>Error: {error}</p> : null
                        }
                    </div>
                    <Typography variant="subtitle2">
                        <Button onClick={resetValues}>Reset Input</Button>
                    </Typography>
                </div>

                <FormControl sx={{ marginRight: 0 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={<SaveIcon />}
                    >Register</Button>
                </FormControl>

            </form>
        </Box>
    );
}
