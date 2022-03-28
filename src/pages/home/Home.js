import Container from '@mui/material/Container';
import Carousel from './Carousel';
import DisplayProducts from './DisplayProducts';
import HomeReviews from './HomeReviews';
import CustomerQuestions from './CustomerQuestions';

export default function Home() {
    return (
        <div>
            <Container>
                <h1>Home</h1>

                <Carousel />

                <DisplayProducts />

                <HomeReviews />

                <CustomerQuestions />

            </Container>
        </div>
    );
}