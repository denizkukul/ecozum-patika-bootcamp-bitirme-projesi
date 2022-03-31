import { Box, Button, TextField } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useForm } from '../../hooks/useForm';
import { addMember } from '../../store/boards/boardActions';

type AddMemberFormProps = {
  boardID: number
  ownerName?: string
}

export const AddMemberForm: React.FC<AddMemberFormProps> = ({ boardID, ownerName }) => {
  const { formValues, updateFormValues, clearFormValues } = useForm({ username: '', boardId: boardID });
  const dispatch = useAppDispatch();

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues.username === ownerName) {
      clearFormValues();
      return
    }
    dispatch(addMember({ data: formValues }))
    clearFormValues();
  }

  return (
    <Box component='form' display='flex' onSubmit={handleAddMember}>
      <TextField name='username' type='text' value={formValues.username} placeholder='Username' onChange={updateFormValues} />
      <Button type='submit'>Add</Button>
    </Box>
  )
}