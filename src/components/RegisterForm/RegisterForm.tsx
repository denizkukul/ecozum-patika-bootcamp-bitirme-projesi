import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box/Box';
import TextField from '@mui/material/TextField';
import { useForm } from '../../hooks/useForm';
import { RegisterRequest } from '../../services/server/controllers/auth/types';
import { containerStyle, formStyle, inputStyle, titleStyle } from './RegisterForm.styles';

type RegisterFormProps = {
  onSubmit: (formValues: RegisterRequest) => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, children }) => {
  const { formValues, updateFormValues } = useForm({ username: '', password: '', passwordConfirm: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  }

  return (
    <Box component='form' sx={formStyle} onSubmit={handleSubmit}>
      <Box sx={containerStyle}>
        <Typography color='primary' sx={titleStyle}>REGISTER</Typography>
        <TextField sx={inputStyle} name='username' type='text' placeholder='Username' value={formValues.username} onChange={updateFormValues} />
        <TextField sx={inputStyle} name='password' type='password' placeholder='Password' value={formValues.password} onChange={updateFormValues} />
        <TextField sx={inputStyle} name='passwordConfirm' type='password' placeholder='Confirm Password' value={formValues.passwordConfirm} onChange={updateFormValues} />
        <Button type='submit'>Register</Button>
        {children}
      </Box>
    </Box>
  )
}