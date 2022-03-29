import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { RegisterRequest } from "../services/server/controllers/auth/types";

type RegisterFormProps = {
  onSubmit: (formValues: RegisterRequest) => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, children }) => {
  const { formValues, updateFormValues } = useForm({ defaultValues: { username: '', password: '', passwordConfirm: '' } });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  }

  return (
    <Box component='form' sx={{ bgcolor: 'secondary.main', p: 2, width: '650px', height: '100%', borderRadius: '5px', boxSizing: 'border-box' }} onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '600', fontFamily: 'Poppins' }}>
        <Typography color='primary' sx={{ fontFamily: 'Poppins', fontSize: '25px', fontWeight: '600', textAlign: 'center', flex: 1, my: 2 }}>REGISTER</Typography>
        <TextField sx={{ bgcolor: 'white', width: '60%', mb: 2 }} name='username' type='text' placeholder="Username" value={formValues.username} onChange={updateFormValues} />
        <TextField sx={{ bgcolor: 'white', width: '60%', mb: 2 }} name='password' type='password' placeholder="Password" value={formValues.password} onChange={updateFormValues} />
        <TextField sx={{ bgcolor: 'white', width: '60%', mb: 2 }} name='passwordConfirm' type='password' placeholder="Confirm Password" value={formValues.passwordConfirm} onChange={updateFormValues} />
        <Button type='submit'>Register</Button>
        {children}
      </Box>
    </Box>
  )
}