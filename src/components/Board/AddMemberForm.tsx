import { Box, Button, TextField } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { MemberRequest } from '../../services/server/controllers/member';

type AddMemberFormProps = {
  boardID: number
  onSubmit: (formValues: MemberRequest) => void
}

export const AddMemberForm: React.FC<AddMemberFormProps> = ({ onSubmit, boardID }) => {
  const { formValues, updateFormValues, clearFormValues } = useForm({ username: '', boardId: boardID });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    clearFormValues();
  }

  return (
    <Box component='form' display='flex' onSubmit={handleSubmit}>
      <TextField name='username' type='text' value={formValues.username} placeholder='Username' onChange={updateFormValues} />
      <Button type='submit'>Add</Button>
    </Box>
  )
}