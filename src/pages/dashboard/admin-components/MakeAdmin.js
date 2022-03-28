import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardBody from '../DashboardBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useLocal from '../../../hooks/useLocal';
import useGlobals from '../../../hooks/useGlobals';
import UnAuthorized from './UnAuthorized';

export default function MakeAdmin() {

    const { isLoggedIn, isAdmin } = useLocal();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login/sign-in");
        }
    }, [isLoggedIn, isAdmin, navigate]);

    const { SERVER_URL } = useGlobals();
    const [usermail, setUsermail] = React.useState('');
    const [response, setResponse] = React.useState('');

    function handleEmailInput(event) {
        setUsermail(event.target.value);
    }

    function handleMakeAdminSubmit(event) {
        event.preventDefault();
        fetch(`${SERVER_URL}/make-admin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: usermail })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.reply === "SUCCESS") {
                    setResponse(`${usermail} is now an ADMIN !!`);
                    document.getElementById("emailInput").value = "";
                }
                else if (data.reply === "FAILURE") {
                    setResponse(`Error in making ${usermail} an admin!`)
                }
                else if (data.reply === "NOTFOUND") {
                    setResponse(`${usermail} is not a user. Please make it user first!`);
                }
            })
            .catch(err => console.log(err.message));
        // .catch(err => setResponse(err.message));
    }

    function handleReset() {
        setResponse("");
        setUsermail("");
        document.getElementById("emailInput").value = "";
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
            >Make Admin</Typography>

            {
                !isAdmin() ? <Box sx={{ marginLeft: { md: "70px" } }}>
                    <UnAuthorized />
                </Box> : <Container>
                    <form onSubmit={handleMakeAdminSubmit}>
                        <Box sx={{ width: "98%", marginLeft: { md: "90px" } }}>
                            <Typography variant="subtitle2"
                            >Enter an email below to make it an Admin:</Typography>
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
                                    color: "maroon"
                                }}
                            >Server response: {response}</Typography>}
                            <br />
                            <input
                                id="emailInput"
                                type="email"
                                value={usermail}
                                onChange={handleEmailInput}
                                style={{
                                    maxWidth: "400px",
                                    height: 30,
                                    marginTop: 2,
                                    padding: 16
                                }}
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ marginLeft: "10px", marginTop: { md: "-3px", xs: "15px" } }}
                            >Make Admin</Button>
                            <Button
                                onClick={handleReset}
                                sx={{ marginTop: { md: "-3px", xs: "15px" } }}
                            > Reset</Button>
                        </Box>
                    </form>
                </Container>
            }
        </div >
    );
}