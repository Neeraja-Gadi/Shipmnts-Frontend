import React, { useState, useEffect } from 'react';
import { Grid, Button, Card, CardContent, Typography, TextField } from '@mui/material';
import { useParams } from 'react-router-dom'; import { useNavigate } from 'react-router-dom'
import NavBar from "./NavBar"


let token = localStorage.getItem("token")

const buttonStyle = {
    backgroundColor: '#f7f2f2',
    color: 'black',
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '10px',
    padding: '5px 10px',
    margin: '0px,2.5px',
};

const DetailedQuestion = () => {
    const navigate = useNavigate();

    const [questionTitle, setQuestionTitle] = useState('');
    const [questionBody, setQuestionBody] = useState('');
    const [questionAccepted, setQuestionAccepted] = useState('');
    const [answerBody, setAnswerBody] = useState('');
    const [allAnswers, setAllAnswers] = useState([]);

    useEffect(() => {
        token = localStorage.getItem("token")
        if (!token) {
            alert("Youare not Logged In . Please Login")
            navigate('/login')
        }
    }, []
    )

    const params = useParams();
    useEffect(() => {
        let questionId = params.questionId
        fetch(`http://localhost:8000/api/qa/questions?questionId=${questionId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-auth-token": token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("accepted",data)
                setQuestionTitle(data.data.title)
                setQuestionBody(data.data.body)
                setQuestionAccepted(data.data.AcceptedAnswerId._id)

            })
            .catch((err) => console.log(err));


    }, []);

    //Post a  answer
    const handlePostAnswer = () => {
        let questionId = params.questionId
        fetch(`http://localhost:8000/api/qa/questions/${questionId}/answers`, {
            method: 'POST',
            body: JSON.stringify({ body: answerBody }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-auth-token": token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == true) navigate('/')
            })
            .catch((err) => console.log(err));

    }

    //Get All answers
    useEffect(() => {
        let questionId = params.questionId
        fetch(`http://localhost:8000/api/qa/questions/${questionId}/answers`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-auth-token": token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setAllAnswers(data.data)
                console.log('answers', data)
            })
            .catch((err) => console.log(err));


    }, []);


    const handleAcceptAnswer = (answerid) => {
        let questionId = params.questionId
        fetch(`http://localhost:8000/api/qa/questions/${questionId}/answers/${answerid}/accept`, {
            method: 'PUT',
            body: JSON.stringify({ AcceptedAnswerId: answerid }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-auth-token": token,
            },
        })
            .then((response) => response.json()).then((data)=>{if(data.status==true)setQuestionAccepted(answerid)})

            .catch((err) => console.log(err));
    };

    return (
        <div>
            <NavBar />

            <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                <Grid container spacing={5} justifyContent="space-between" style={{ marginRight: '20px' }}>

                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h2' fontWeight="bold" fontSize="20px" style={{ margin: '50px 0px 0px 10px' }}>
                            {questionTitle}
                        </Typography>
                        <br></br>
                        <Button style={{ margin: '50px 0px 0px 10px', backgroundColor: "#0b6ceec9", color: "white", borderRadius: '10px', Display: 'flex', justifyContent: 'flex-end' }} onClick={() => { navigate('/PostAQuestion') }}>Ask a Question</Button>


                    </Grid>

                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                        <Typography variant="h6" sx={{ marginBottom: "10px" }} gutterBottom>

                            {questionBody}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} style={{ marginBottom: '20px' }} >
                        <Card>
                            <CardContent>
                                <Typography variant="title" fontWeight='bold' sx={{ marginBottom: "10px" }} align="center" gutterBottom>
                                    Know someone who can answer? Share a link to this question via email, Twitter, or Facebook.
                                    <br></br>
                                    <br></br>

                                    Your Answer


                                </Typography>
                                <br></br>
                                <br></br>


                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    name="body"
                                    value={answerBody}
                                    onChange={(e) => setAnswerBody(e.target.value)}
                                />
                                <br></br>

                                <Button
                                    style={{ margin: '50px 0px 0px 10px', backgroundColor: "#0b6ceec9", color: "white", borderRadius: '10px', Display: 'flex', justifyContent: 'flex-end' }}
                                    onClick={handlePostAnswer}>
                                    Post Your Answer
                                </Button>


                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} style={{ marginBottom: '20px' }} >
                        <Typography variant="h6" sx={{ marginBottom: "10px" }} gutterBottom>

                            Other related Answers
                        </Typography>
                        {allAnswers.map((answer) => (
                            <div key={answer._id} style={{ marginBottom: '20px' }}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={10} md={6}>

                                                {answer.body && (
                                                    <Grid item xs={10} md={6}>
                                                        {answer.body}
                                                    </Grid>
                                                )}


                                            </Grid>
                                            {questionAccepted == answer._id ?
                                                <Button
                                                    onClick={() => { handleAcceptAnswer(answer._id) }}
                                                    style={{ margin: '20px 0px 0px 20px', backgroundColor: "green", color: "white", borderRadius: '10px' }}>
                                                    Accepted
                                                </Button> :

                                                <Button
                                                    onClick={() => { handleAcceptAnswer(answer._id) }}
                                                    style={{ margin: '20px 0px 0px 20px', backgroundColor: "#FFA500", color: "white", borderRadius: '10px' }}>
                                                    Accept
                                                </Button>

                                            }



                                        </Grid>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default DetailedQuestion;