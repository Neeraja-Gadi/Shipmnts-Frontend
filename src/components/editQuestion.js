import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import NavBar from "./NavBar"


let token = localStorage.getItem("token")

const tagStyle = {
    backgroundColor: '#0b6ceec9',
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold',
    borderRadius: '10px',
    padding: '5px 10px', 
    margin: '0px 2.5px', 
    display: 'inline-block',
    cursor: 'pointer', 
    textDecoration: 'none', 
};

function EditAQuestion() {
    const navigate = useNavigate();
    const { questionid } = useParams()
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionBody, setQuestionBody] = useState('');
    const [inputTags, setInputTags] = useState('');
    const [questionTags, setQuestionTags] = useState([]);
    const [questionData, setQuestionData] = useState({})

    useEffect(() => {
        token = localStorage.getItem("token")
        if (!token) {
            alert("Youare not Logged In . Please Login")
            navigate('/login')}
    },[]
    )
    

    useEffect(() => {
        fetch(`http://localhost:8000/api/qa/questions?questionId=${questionid}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-auth-token": token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setQuestionData(data.data);
                setQuestionTitle(data.data.title);
                setQuestionBody(data.data.body);
                setQuestionTags([...data.data.tags]);

            })
            .catch((err) => console.log(err));
    }, []);

    const handleQuestionUpdateSubmit = () => {


        fetch(`http://localhost:8000/api/qa/questions/${questionid}`, {
            method: 'PUT',
            body: JSON.stringify({ body: questionBody, tags: questionTags, title: questionTitle }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-auth-token": token,
            },
        })
            .then((response) => response.json())

            .catch((err) => console.log(err));
            alert('Question successfully Updated')
            navigate('/')
    };

   
    function onKeyDown(e){
        let trimmedInput=inputTags.trim()
        if((e.key===' '||e.key==="Enter")&& trimmedInput.length ){
            setQuestionTags([...questionTags,trimmedInput])
            setInputTags('')
        }
        if(e.key==="Backspace" && (!inputTags.length &&questionTags.length)){
            let tags=[...questionTags]
            const removendEle=tags.pop()
            setInputTags(removendEle)
            setQuestionTags(tags)
        }
    }

    return (
        <div>
            <NavBar/>
        <Container sx={{ backgroundColor: "#f9f1f1eb" }}>
            <Typography variant="h5" align="center" mb={10} gutterBottom>
                Edit Question
            </Typography>
            <Grid container spacing={2}>

                <Grid item xs={12} md={8} style={{ marginBottom: '20px' }} >
                    <Card>
                        <CardContent>
                            <Typography variant="title" fontWeight='bold' sx={{ marginBottom: "10px" }} align="center" gutterBottom>
                                Title
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
                                <br></br>
                                <br></br>
                                {questionTags.length > 0 && (
                                    <Grid item xs={10} md={6}>
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
                                onChange={(e=>{setInputTags(e.target.value)})}
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
                        onClick={handleQuestionUpdateSubmit}
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

export default EditAQuestion;