import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const defaultTheme = createTheme();

export default function SignUp() {

  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [result, setResult] = React.useState({ status: false, message: "" })

  const navigate = useNavigate();

  function SignUpHandler() {
    const data = { userName, password }
    console.log(data)
    fetch(`http://localhost:8000/api/users/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) =>
      response.json().then((responseData) => {

        setResult(responseData);

        if (responseData.status) {
          navigate("/login")
          setUserName("")

          setTimeout(() => {
            setResult({ status: false, message: "" });
          }, 2000);
        }
        console.log(responseData)
        setTimeout(() => {
          setResult({ status: false, message: "" });

        }, 8000);
      })
    );

  }


  return (
    <ThemeProvider theme={defaultTheme}>

      <Container component="main" maxWidth="xs" style={{ border: '0.1px solid grey', borderRadius: '0.5rem', boxShadow: 'lightgrey', marginTop: '7.5%' }}>
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
            Create A New Account
          </Typography>
          <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  label="UserName"
                  required
                  fullWidth                
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  autoFocus
                />
              </Grid>
            
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>

                {result.status ? (
                  <h4 style={{ color: "green" }}>
                    {result.message}
                  </h4>
                ) : (
                  <h4 style={{ color: "red" }}>
                    {result.message}
                  </h4>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={SignUpHandler}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}