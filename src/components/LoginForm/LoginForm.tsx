import { Alert, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useForm } from '../../hooks/useForm';
import { login } from '../../store/auth/authActions';
import { containerStyle, formStyle, inputStyle, titleStyle } from './LoginForm.styles';

type Error = {
  [key: string]: {
    error: boolean,
    text: string
  }
}

export const LoginForm: React.FC = ({ children }) => {
  const { formValues, updateFormValues } = useForm({ username: '', password: '' });
  const [error, setError] = useState<null | Error>(null)
  const errorCode = useAppSelector(state => state.status.errorCode);
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateInput()) {
      dispatch(login({ data: formValues }));
    }
  }

  const validateInput = () => {
    let result = true;
    const newError: Error = {};
    Object.entries(formValues).forEach(entry => {
      if (entry[1] === '') {
        newError[entry[0]] = {
          error: true,
          text: 'This field is required!'
        };
        result = false;
      }
    })
    setError(newError)
    return result;
  }

  return (
    <Box component='form' sx={formStyle} onSubmit={handleLogin}>
      <Box sx={containerStyle}>
        <Typography color='primary' sx={titleStyle}>LOGIN</Typography>
        {
          errorCode === 403 && <Alert sx={{ mb: 2 }} severity="error">Incorrect username or password!</Alert>
        }
        <TextField
          sx={inputStyle}
          name='username'
          type='text'
          placeholder='Username'
          error={error?.username?.error}
          helperText={error?.username?.text}
          value={formValues.username}
          onChange={updateFormValues}
        />
        <TextField
          sx={inputStyle}
          name='password'
          type='password'
          placeholder='Password'
          error={error?.password?.error}
          helperText={error?.password?.text}
          value={formValues.password}
          onChange={updateFormValues} />
        <Button type='submit'>Login</Button>
        {children}
      </Box>
    </Box>
  )
}