import { useState } from 'react';

import { TextField, Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
// import userInfo from '../../../server/seeders/userSeeds.json' ;
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function LoginComponent() {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [login] = useMutation(LOGIN_USER);

    const navigate = useNavigate();

    // const loginValidation = (username, password) => {
    //   const user = userInfo.find(user => user.username === username && user.password === password);
    //   return user !== undefined;     
    // }
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      setErrorMessage('Incorrect username or password!');
    }

    // clear form values
    setFormState({
      username: '',
      password: '',
    });
  };
      
    //   if (loginValidation(username, password)) {
    //     navigate('/');
    //   }else {
    //     alert('Incorrect username or password!');
    //   }
    // };
  
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              backgroundColor: '#b4c4ab',
              padding: '5rem',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              id="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              required
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
              InputProps={{
                style: { backgroundColor: 'white' },
              }}
            />
            <Button type="submit" variant="contained" sx={{ mt: 1, backgroundColor: '#46563c', '&:hover': {
                backgroundColor: '#869f76'
            } }}>
              Login
            </Button>
            {errorMessage && (
              <Typography color="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
    )}
            <Typography padding={1}>Not Yet A User?
            </Typography>
            <Button type="submit" variant="contained" sx={{ mt: 1, backgroundColor: '#46563c', '&:hover': {
                backgroundColor: '#869f76'
            } }} onClick={() => navigate('/signUp')}>
              Register
            </Button>
          </Box>
        </div>
      );
  }
  
  export default LoginComponent;