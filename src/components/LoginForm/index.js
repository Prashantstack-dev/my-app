import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';

//importing validation
import validator from 'email-validator';

export const isValidEmail = (email) => {
  if (!email) return false;
  return validator.validate(email);
};

export const isValidPassword = (password) => {
  if (!password || password.length < 8) return false;
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(password);
};


export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [error,setError]= useState('');
  const [passwordError,setPasswordError]= useState('');
  
  const validateForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
     //RESET ERRORS FIRST
     setError('');
     setPasswordError('');

    // Add validation code here
  if(!validator.validate(email)){
    
    setError('Email is not valid')
    return false;
  }
  if(!password || password.length < 8){
   
    setPasswordError('Password should atleast be 8 chars ')
    return false;
  } 
  
  if(!passwordRegex.test(password)){
    
     setPasswordError('Password should atleast have one special chars,Uppercase,LowerCase,and Numbers')
    return false;
  }
return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call validation and store result in isValid
    const isValid = validateForm(event);
     if (!isValid) return;

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
   
    setShowAlert(true);
  };

  return (
    <>
      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert severity='success'>LoginSuccessful</Alert>
        </Snackbar>
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 2
          }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!error}
              helperText={error}
            /> 
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!passwordError}
              helperText={passwordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
