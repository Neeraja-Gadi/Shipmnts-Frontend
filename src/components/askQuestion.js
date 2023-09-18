
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, List, ListItemText, Button, Grid, Card, CardContent } from '@mui/material';
import NavBar from "./NavBar"

import { useNavigate } from 'react-router-dom';
const tagStyle = {
    backgroundColor: '#0b6ceec9',
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold',
    borderRadius: '10px',
    padding: '5px 10px',
    margin: '0px 2.5px',
    marginBottom:'5px',
    display: 'inline-block',
    cursor: 'pointer',
    textDecoration: 'none',
};

function PostAQuestion() {
    let token = localStorage.getItem("token");
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionBody, setQuestionBody] = useState('');
    const [questionTags, setQuestionTags] = useState([]);
    const [inputTags, setInputTags] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        token = localStorage.getItem("token")
        if (!token) {
            alert("Youare not Logged In . Please Login")
            navigate('/login')}
    },[]
    )

    const handleQuestionSubmit = () => {

        fetch(`http://localhost:8000/api/qa/questions`, {
            method: 'POST',
            body: JSON.stringify({ body: questionBody, tags: questionTags, title: questionTitle }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-auth-token": token,
            },
        })
            .then((response) => response.json()).then(data => {
                if (data.status == true) navigate('/')
            })
            .catch((err) => console.log(err));

    };

    function onKeyDown(e) {
        let trimmedInput = inputTags.trim()
        if ((e.key === ' ' || e.key === "Enter") && trimmedInput.length) {
            setQuestionTags([...questionTags, trimmedInput])
            setInputTags('')
        }
        if (e.key === "Backspace" && (!inputTags.length && questionTags.length)) {
            let tags = [...questionTags]
            const removendEle = tags.pop()
            setInputTags(removendEle)
            setQuestionTags(tags)
        }
    }

    return (
        <div>
            <NavBar />

            <Container sx={{ backgroundColor: "#f9f1f1eb", marginTop: "30px" }}>
                <Typography variant="h5" align="center" mb={10} gutterBottom>
                    Ask a Public Question
                </Typography>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={8} style={{ marginBottom: '20px' }} >
                        <Card elevation={3} sx={{ marginBottom: '20px', backgroundColor: "#def0f5c9", boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: "10px" }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ marginLeft: '20px' }}>Making analytics simple and actionable</Typography>

                                <Grid container spacing={0.5}>
                                    <Grid item xs={12} md={10}>
                                        <Typography variant="h6" fontWeight="bold" sx={{ marginLeft: '20px' }}>Summary</Typography>
                                        <List>

                                            <ListItemText primary={<Typography variant="body1" >Summarize your problem in a one-line title. </Typography>} />

                                            <ListItemText primary={<Typography variant="body1" >Describe your problem in more detail</Typography>} />

                                            <ListItemText primary={<Typography variant="body1" >Describe what you tried and what you expected to happen.</Typography>} />
                                            <ListItemText primary={<Typography variant="body1">Add “tags” which help surface your question to members of the community.</Typography>} />
                                            <ListItemText primary={<Typography variant="body1" >Review your question and post it to the site.</Typography>} />
                                        </List>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8} style={{ marginBottom: '20px' }} >
                        <Card>
                            <CardContent>
                                <Typography variant="title" fontWeight='bold' sx={{ marginBottom: "10px" }} align="center" gutterBottom>
                                    Title
                                </Typography>
                                <br></br>
                                <br></br>
                                <Typography variant="subtitle" align="center" gutterBottom>
                                    Be specific and imagine you’re asking a question to another person.
                                </Typography>
                                <br></br>
                                <br></br>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={questionTitle}
                                    onChange={(e) => setQuestionTitle(e.target.value)}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8} style={{ marginBottom: '20px' }} >
                        <Card>
                            <CardContent>
                                <Typography variant="title" fontWeight='bold' align="center" gutterBottom>
                                    What are the details of your problem?(Body)
                                </Typography>
                                <br></br>
                                <br></br>
                                <Typography variant="subtitle" align="center" gutterBottom>
                                    Introduce the problem and expand on what you put in the title. Minimum 20 characters.
                                </Typography>
                                <br></br>
                                <br></br>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={questionBody}
                                    onChange={(e) => setQuestionBody(e.target.value)}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8} style={{ marginBottom: '20px' }} >
                        <Card >
                            <CardContent >
                                <Typography variant="title" fontWeight='bold' align="center" sx={{ marginBottom: "10px" }} gutterBottom>
                                    Tags
                                </Typography>
                                <br></br>
                                <br></br>
                                <Typography variant="subtitle" align="center" sx={{ marginBottom: "10px" }} gutterBottom>
                                    Add up to 5 tags to describe what your question is about. Start typing to see suggestions.                            </Typography>
                                {questionTags.length > 0 && (
                                    <Grid item xs={10} md={6}  >
                                        {questionTags.map((tag, index) => (
                                            <span key={index} style={tagStyle}>
                                                {tag}
                                            </span>
                                        ))}
                                    </Grid>
                                )}
                                <br></br>
                                <br></br>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={inputTags}
                                    onChange={(e => { setInputTags(e.target.value) })}
                                    onKeyDown={onKeyDown}
                                >

                                </TextField>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleQuestionSubmit}
                            style={{ marginTop: '16px' }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default PostAQuestion;
