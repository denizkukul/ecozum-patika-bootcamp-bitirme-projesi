import { useForm } from "../hooks/useForm";
import { RegisterRequest } from "../services/server/controllers/auth/types";

type RegisterFormProps = {
  onSubmit: (formValues: RegisterRequest) => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const { formValues, updateFormValues } = useForm({ defaultValues: { username: '', password: '', passwordConfirm: '' } });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  }

  return (
    <form className='register-form' onSubmit={handleSubmit}>
      <input name='username' type='text' placeholder="Username" onChange={updateFormValues} />
      <input name='password' type='password' placeholder="Password" onChange={updateFormValues} />
      <input name='passwordConfirm' type='password' placeholder="Confirm Password" onChange={updateFormValues} />
      <button>Register</button>
    </form>
  )
}