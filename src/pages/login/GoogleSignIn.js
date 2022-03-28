import { useLocation, useNavigate } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';
import useLocal from '../../hooks/useLocal';
import Button from '@mui/material/Button';

export default function GoogleSignIn() {

    const { setLoggedIn } = useLocal();
    const navigate = useNavigate();
    const location = useLocation();
    const destUrl = location.state?.from ? location.state?.from : "/";

    const {
        signInUsingGoogle,
        setTheUser
    } = useFirebase();

    function handleGoogleSignIn() {
        signInUsingGoogle()
            .then(result => {
                const loggedUser = result.user;
                setTheUser(loggedUser);
                setLoggedIn();
                navigate(destUrl);
            }).catch(error => {
                console.log("Error while trying to google-sign-in");
                console.log(error.message);
            });
    }

    return (
        <Button
            variant="contained"
            size="large"
            sx={{ marginTop: 20, marginBottom: 5 }}
            onClick={handleGoogleSignIn}
        >Google Sign-In</Button>
    );
}