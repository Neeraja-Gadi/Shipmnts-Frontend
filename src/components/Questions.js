
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FiEdit2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import NavBar from "./NavBar"



const buttonStyle = {
  backgroundColor: '#f7f2f2',
  color: 'black',
  fontSize: '10px',
  fontWeight: 'bold',
  borderRadius: '10px',
  padding: '5px 5px',
  margin: '0px,2.5px',
};
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


let token = localStorage.getItem("token")

const AllQuestionCards = () => {
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const [userId, setUserId] = useState('')


  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("user"))?._id)
  }, [])
  useEffect(() => {
    fetch(`http://localhost:8000/api/qa/questions`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "x-auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllQuestions(data.data);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div>
      <NavBar />
      <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h2' fontSize="30px" style={{ margin: '50px 0px 0px 10px' }}>
          Top Questions
        </Typography>

        <Button style={{ margin: '50px 0px 0px 10px', backgroundColor: "#0b6ceec9", color: "white", borderRadius: '10px', Display: 'flex', justifyContent: 'flex-end' }} onClick={()=>{navigate('/PostAQuestion')}}>Ask a Question</Button>

      </Grid>

      <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Card style={{ margin: '0px 30px 30px 0px', backgroundColor: 'white', display: 'flex', alignItems: 'center', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
          <CardContent style={{ padding: '7px' }}>
            <Button style={buttonStyle}>Intrested</Button>
            <Button style={buttonStyle}>Bounted</Button>
            <Button style={buttonStyle}>Hot</Button>
            <Button style={buttonStyle}>Week</Button>
            <Button style={buttonStyle}>Month</Button>

          </CardContent>
        </Card>
      </Grid>
      {allQuestions?.map((question) => (
        <div key={question._id} style={{ marginBottom: '20px' }}>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={10} md={6}>

                  {
                    question.user._id == userId ?
                      <button onClick={() => { }} style={{ float: 'right', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                        <FiEdit2 onClick={() => { navigate(`/EditAQuestion/${question._id}`) }} style={{ float: 'right', fontSize: '20px' }} />
                      </button> : ""
                  }
                  {question.title && (
                    <Grid item xs={10} md={6} >
                      <strong>title:</strong> {question.title}
                    </Grid>
                  )}
                  {question.tags.length > 0 && (
                    <Grid item xs={10} md={6}>
                      {question.tags.map((tag, index) => (
                        <span key={index} style={tagStyle}>
                          {tag}
                        </span>
                      ))}
                    </Grid>
                  )}
                  {question.body && (
                    <Grid item xs={10} md={6}>
                      {question.body}
                    </Grid>
                  )}

                  <Button
                    onClick={() => { navigate(`/DetailedQuestion/${question._id}`) }}
                    style={{ margin: '20px 0px 0px 20px', backgroundColor: "#FFA500", color: "white", borderRadius: '10px'}}>
                    View
                  </Button>

                </Grid>


              </Grid>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default AllQuestionCards;
