import { Alert, Button, Typography } from '@mui/material';
import Box from '@mui/material/Box/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useForm } from '../../hooks/useForm';
import { register } from '../../store/auth/authActions';
import { containerStyle, formStyle, inputStyle, titleStyle } from './RegisterForm.styles';

type Error = {
  [key: string]: {
    error: boolean,
    text: string
  }
}

export const RegisterForm: React.FC = ({ children }) => {
  const { formValues, updateFormValues } = useForm({ username: '', password: '', passwordConfirm: '' });
  const [error, setError] = useState<null | Error>(null);
  const errorCode = useAppSelector(state => state.status.errorCode);
  const dispatch = useAppDispatch();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateInput()) {
      dispatch(register({ data: formValues }));
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
    if (formValues.password !== formValues.passwordConfirm) {
      newError['password'] = { error: true, text: 'Passwords do not match!' }
      newError['passwordConfirm'] = { error: true, text: 'Passwords do not match!' }
      result = false;
    }
    setError(newError)
    return result;
  }

  return (
    <Box component='form' sx={formStyle} onSubmit={handleRegister}>
      <Box sx={containerStyle}>
        <Typography color='primary' sx={titleStyle}>REGISTER</Typography>
        {
          errorCode === 401 && <Alert sx={{ mb: 2 }} severity="error">Username already in use!</Alert>
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
          onChange={updateFormValues}
        />
        <TextField
          sx={inputStyle}
          name='passwordConfirm'
          type='password'
          placeholder='Confirm Password'
          error={error?.passwordConfirm?.error}
          helperText={error?.passwordConfirm?.text}
          value={formValues.passwordConfirm}
          onChange={updateFormValues}
        />
        <Button type='submit'>Register</Button>
        {children}
      </Box>
    </Box>
  )
}