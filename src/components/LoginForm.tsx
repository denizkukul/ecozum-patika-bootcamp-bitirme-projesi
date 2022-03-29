import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { LoginRequest } from "../services/server/controllers/auth";

type LoginFormProps = {
  onSubmit: (formValues: LoginRequest, authPersistence: boolean) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, children }) => {
  const { formValues, updateFormValues } = useForm({ defaultValues: { username: '', password: '' } });
  const [authPersistence, setAuthPersistence] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues, authPersistence);
  }

  const updateCheckboxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthPersistence(e.target.checked);
  }

  return (
    <Box component='form' sx={{ bgcolor: 'secondary.main', p: 2, width: '650px', height: '100%', borderRadius: '5px', boxSizing: 'border-box' }} onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '600', fontFamily: 'Poppins', overflow: 'auto' }}>
        <Typography color='primary' sx={{ fontFamily: 'Poppins', fontSize: '25px', fontWeight: '600', textAlign: 'center', my: 2 }}>LOGIN</Typography>
        <TextField sx={{ bgcolor: 'white', width: '60%', mb: 2 }} name='username' type='text' placeholder="Username" value={formValues.username} onChange={updateFormValues} />
        <TextField sx={{ bgcolor: 'white', width: '60% ', mb: 2 }} name='password' type='password' placeholder="Password" value={formValues.password} onChange={updateFormValues} />
        <FormControlLabel control={<Checkbox checked={authPersistence} onChange={updateCheckboxValue} inputProps={{ 'aria-label': 'controlled' }} />} label="Stay logged in" />
        <Button type='submit'>Login</Button>
        {children}
      </Box>
    </Box>
  )
}