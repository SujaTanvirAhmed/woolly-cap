import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Rating from '@mui/material/Rating';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Loader from '../../components/loader/Loader';
import DbError from '../../components/DbError';
import useGlobals from '../../hooks/useGlobals';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function HomeReviews() {

    const { SERVER_URL } = useGlobals();
    const [reviews, setReviews] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbError, setDbError] = React.useState(true);

    React.useEffect(() => {
        fetch(`${SERVER_URL}/reviews`)
            .then(response => response.json())
            .then(data => {
                setReviews(data);
                setIsLoading(false);
                setDbError(false);
            })
            .catch(err => {
                setDbError(true);
                setIsLoading(false);
                console.log(err.message)
            });
    }, [SERVER_URL]);

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = reviews.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <div style={{ marginTop: "70px", marginBottom: "50px" }}>
            <Typography variant="h4" sx={{ marginBottom: 1 }}>Customer Reviews</Typography>
            {
                isLoading ? (<Loader />) :
                    (dbError ? <DbError message="DB Error in loading customer reviews!" /> :
                        <Box sx={{ flexGrow: 1, marginTop: 7 }}>
                            <AutoPlaySwipeableViews
                                axis={theme.direction === 'ltr' ? 'x-reverse' : 'x'}
                                index={activeStep}
                                onChangeIndex={handleStepChange}
                                enableMouseEvents
                            >
                                {reviews.map((step, index) => (
                                    <div key={index}>
                                        {
                                            Math.abs(activeStep - index) <= 2 ? (
                                                <Grid container>
                                                    <Grid item xs={12} md={5} sx={{ padding: 2 }}>
                                                        <Box>
                                                            <Typography
                                                                variant="h6"
                                                            >{step.name}</Typography>
                                                            <Typography
                                                                variant="body2"
                                                            >
                                                                {step.email}
                                                            </Typography>
                                                            <hr />
                                                            <Typography
                                                                variant="body2"
                                                            >Rating given: {step.rating}</Typography>
                                                            <Rating
                                                                name="half-rating-read"
                                                                defaultValue={step.rating}
                                                                precision={0.5}
                                                                readOnly
                                                            />
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} md={7} sx={{ padding: 2 }}>
                                                        <Box>
                                                            <Typography paragraph sx={{ textAlign: "left" }}>
                                                                <FormatQuoteIcon
                                                                    sx={{
                                                                        fontSize: 45,
                                                                        transform: "rotate(180deg)",
                                                                        color: "lightgray"
                                                                    }}
                                                                />
                                                                {step.review}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            ) : null
                                        }
                                    </div>
                                ))}
                            </AutoPlaySwipeableViews>
                            <MobileStepper
                                steps={maxSteps}
                                position="static"
                                activeStep={activeStep}
                                nextButton={
                                    <Button
                                        size="small"
                                        onClick={handleNext}
                                        disabled={activeStep === maxSteps - 1}
                                    >
                                        Next
                                        {theme.direction === 'rtl' ? (
                                            <KeyboardArrowLeft />
                                        ) : (
                                            <KeyboardArrowRight />
                                        )}
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                        {theme.direction === 'rtl' ? (
                                            <KeyboardArrowRight />
                                        ) : (
                                            <KeyboardArrowLeft />
                                        )}
                                        Back
                                    </Button>
                                }
                            />
                        </Box>
                    )
            }
        </div>
    );
}