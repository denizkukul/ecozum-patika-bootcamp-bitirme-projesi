import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { LoginRequest } from '../../services/server/controllers/auth';
import { containerStyle, formStyle, inputStyle, titleStyle } from './LoginForm.styles';

type LoginFormProps = {
  onSubmit: (formValues: LoginRequest, authPersistence: boolean) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, children }) => {
  const { formValues, updateFormValues } = useForm({ username: '', password: '' });
  const [authPersistence, setAuthPersistence] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues, authPersistence);
  }

  const updateCheckboxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthPersistence(e.target.checked);
  }

  return (
    <Box component='form' sx={formStyle} onSubmit={handleSubmit}>
      <Box sx={containerStyle}>
        <Typography color='primary' sx={titleStyle}>LOGIN</Typography>
        <TextField sx={inputStyle} name='username' type='text' placeholder='Username' value={formValues.username} onChange={updateFormValues} />
        <TextField sx={inputStyle} name='password' type='password' placeholder='Password' value={formValues.password} onChange={updateFormValues} />
        <FormControlLabel control={<Checkbox checked={authPersistence} onChange={updateCheckboxValue} />} label='Stay logged in' />
        <Button type='submit'>Login</Button>
        {children}
      </Box>
    </Box>
  )
}