import * as React from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import useFirebase from '../../../hooks/useFirebase';
import useGlobals from '../../../hooks/useGlobals';

export default function ReviewBody() {
    const { SERVER_URL } = useGlobals();
    const { user } = useFirebase();
    const [userRating, setUserRating] = React.useState(0);
    const [userReview, setUserReview] = React.useState('');

    function handleReviewInput(event) {
        setUserReview(event.target.value);
    }

    function handleRatingInput(event) {
        const rating = parseFloat(event.target.value);
        if (rating > 5) {
            setUserRating(5);
        } else if (rating < 0) {
            setUserRating(0);
        }
        setUserRating(rating);
    }

    function handleReviewSubmit(event) {
        event.preventDefault();

        const reviewAndRating = {
            name: user.displayName,
            email: user.email,
            review: userReview,
            rating: userRating
        }
        fetch(`${SERVER_URL}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reviewAndRating)
        })
            .then(response => response.json())
            .then(data => {
                setUserRating(0);
                setUserReview('');
                console.log(data);
            })
            .catch(err => console.log(err.message));
    }
    return (<Container>
        <form onSubmit={handleReviewSubmit}>
            <Typography
                variant="subtitle2"
                sx={{ marginBottom: 3 }}
            >Please give us your valuable review below:</Typography>

            <Input
                disabled
                type="text"
                value={user.displayName}
                sx={{
                    width: 400,
                    height: 30,
                    marginTop: 10,
                    padding: "10px 15px",
                    lineHeight: "1.5rem"
                }}
            /><br />

            <Input
                disabled
                type="email"
                value={user.email}
                sx={{
                    width: 400,
                    height: 30,
                    marginTop: 10,
                    padding: "10px 15px",
                    lineHeight: "1.5rem"
                }}
            /><br /><br />

            <TextareaAutosize
                required
                onChange={handleReviewInput}
                value={userReview}
                aria-label="minimum height"
                // minRows={3}
                style={{
                    width: 400,
                    padding: 15
                }}
            /><br />

            <Input
                required
                id="ratingInput"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={userRating}
                onChange={handleRatingInput}
                sx={{
                    width: "50%",
                    height: 30,
                    marginTop: 10,
                    padding: "10px 15px",
                    fontSize: "18px",
                    lineHeight: "1.5rem"
                }}
            />
            <br /><br />
            <Button type="submit" variant="contained">Submit</Button>
        </form>
    </Container>
    );
}