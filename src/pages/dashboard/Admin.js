import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Admin() {
    return (
        <Box sx={{ marginTop: 18 }}>
            <Container>
                <Typography variant="h2" gutterBottom component="div">
                    Admin
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Admin text here: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                    quasi quidem quibusdam.
                </Typography>
            </Container>
        </Box>
    );
}