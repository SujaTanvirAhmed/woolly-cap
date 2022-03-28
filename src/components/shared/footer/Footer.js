import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './Footer.css';

function FooterBottom() {
    return (
        <div style={{ backgroundColor: "olive", color: "white" }}>
            <Container>
                <Box>
                    <Typography sx={{ lineHeight: "4rem" }}>
                        <span style={{ display: "inline-block", textAlign: "right" }}>&copy; 2022, All Rights Reseved</span>
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}

export default function Footer() {
    return (
        <>
            <div className="Footer">
                <Container>
                    <Grid container sx={{ textAlign: "left", padding: "30px 0px", marginTop: 10 }}>

                        <Grid item xs={6} md={3} sx={{ marginBottom: 5 }}>
                            <Typography variant="h6">ABOUT US</Typography>
                            <Typography>About us</Typography>
                            <Typography>Why shop with us</Typography>
                            <Typography>Affiliates</Typography>
                        </Grid>

                        <Grid item xs={6} md={3} sx={{ marginBottom: 3 }}>
                            <Typography variant="h6">CUSTOMER SERVICE</Typography>
                            <Typography>Contact Us</Typography>
                            <Typography>Return Policy</Typography>
                            <Typography>Cancellation Policy</Typography>
                            <Typography>Shipping Policy</Typography>
                            <Typography>Track orders</Typography>
                            <Typography>Returns</Typography>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <Typography variant="h6">HELPS SHOPPING</Typography>
                            <Typography>Caring for Winter wear</Typography>
                            <Typography>Buying guide</Typography>
                            <Typography>Gift Card</Typography>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <Typography variant="h6">WOOLLEN WEAR EXCLUSIVE</Typography>
                            <Typography>Corporate Orders</Typography>
                            <Typography>Kailash Yatra</Typography>
                            <Typography>Zero Degrees</Typography>
                            <Typography>Site map</Typography>
                            <Typography>Retailers</Typography>
                        </Grid>

                    </Grid>


                </Container>
            </div>

            <FooterBottom />
        </>
    );
}