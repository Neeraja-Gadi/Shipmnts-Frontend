import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'


const defaultTheme = createTheme();

export default function SignIn() {

  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [result, setResult] = React.useState({ status: false, message: "" })

  
  function LoginHandler() {

    const data = { userName, password }
    fetch(`http://localhost:8000/api/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) =>
      response.json().then((responseData) => {
        console.log(responseData);
        setResult(responseData);
console.log(responseData.status)
        if (responseData.status) {

          localStorage.setItem("token", responseData.token)
          localStorage.setItem("user", JSON.stringify(responseData.data))
          setTimeout(() => {
             navigate("/AllQuestion")

          }, 500);

        }

        setTimeout(() => {
          setResult({ status: false, message: "" });
        }, 8000);
      })
    );

  }


  return (


    <ThemeProvider theme={defaultTheme}>


      <Container component="main" maxWidth="xs" style={{ border: '0.1px solid grey', marginTop: '120px', borderRadius: '0.5rem', boxShadow: 'lightgrey', }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>


          <Box component="form" onSubmit={(e) => e.preventDefault()} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="userName"
              name="userName"
              autoComplete="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            {result.status ? (
              <h4 style={{ color: "green" }}>
                {result.message}
              </h4>
            ) : (
              <h4 style={{ color: "red" }}>
                {result.message}
              </h4>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={LoginHandler}
            >
              Login
            </Button>

            <Grid container>
             
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}