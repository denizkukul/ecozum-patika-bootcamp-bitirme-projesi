import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { LoginRequest } from "../services/server/controllers/auth/types";

type LoginFormProps = {
  onSubmit: (formValues: LoginRequest, authPersistence: boolean) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
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
    <form className='login-form' onSubmit={handleSubmit}>
      <input name='username' type='text' placeholder="Username" onChange={updateFormValues} />
      <input name='password' type='password' placeholder="Password" onChange={updateFormValues} />
      <div>
        <label htmlFor="authPersistence">Stay Logged In</label>
        <input type="checkbox" id="authPersistence" name="authPersistence" onChange={updateCheckboxValue} />
      </div>
      <button>Login</button>
    </form>
  )
}