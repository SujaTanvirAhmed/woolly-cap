import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useGlobals from '../../hooks/useGlobals';
import DbError from '../../components/DbError';
import Loader from '../../components/loader/Loader';

export default function CustomerQuestions() {

    const [questions, setQuestions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [dbError, setDbError] = React.useState(true);
    const { SERVER_URL } = useGlobals();

    React.useEffect(() => {
        fetch(`${SERVER_URL}/questions`)
            .then(response => response.json())
            .then(data => {
                setQuestions(data);
                setIsLoading(false);
                setDbError(false);
            })
            .catch(err => {
                setIsLoading(false);
                setDbError(true);
            });
    }, [SERVER_URL]);

    return (
        <Box sx={{ backgroundColor: "#fafafa", padding: "50px" }}>
            <Typography
                variant="h4"
                sx={{ marginBottom: 5 }}
            >Customer Questions & Answers</Typography>
            {
                isLoading ? (<Loader />) : (
                    dbError ? <DbError message="DB Error in loading customer questions and answers!" /> : (
                        <Container>
                            <Grid container spacing={3}>
                                {questions.map(qs => <React.Fragment key={qs._id}>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="subtitle2">Question:</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography
                                            variant="body2"
                                            sx={{ textAlign: "left" }}
                                        >{qs.question}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="subtitle2">Answer:</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography
                                            variant="body2"
                                            sx={{ textAlign: "left" }}
                                        >{qs.answer}</Typography>
                                    </Grid>
                                    <div style={{
                                        width: "100%",
                                        borderTop: "1px dashed lightgray",
                                        marginTop: "10px"
                                    }}></div>
                                </React.Fragment>)
                                }

                            </Grid>
                        </Container>
                    )
                )
            }
        </Box>
    );
}