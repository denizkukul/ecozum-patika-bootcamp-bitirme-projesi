import { Button, TextField } from "@mui/material"
import Box from "@mui/material/Box/Box"
import { useForm } from "../hooks/useForm"
import { CreateCardRequest } from "../services/server/controllers/card"

type CreateCardFormProps = {
  listID: number
  onSubmit: (formValues: CreateCardRequest) => void
}

export const CreateCardForm: React.FC<CreateCardFormProps> = ({ listID, onSubmit }) => {
  const { formValues, updateFormValues, clearFormValues } = useForm({ defaultValues: { title: '', description: '', listId: listID } });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    clearFormValues();
  }

  return (
    <Box component='form' sx={{ display: 'flex', p: 2, alignItems: 'center' }} onSubmit={handleSubmit}>
      <TextField sx={{ width: '70%', }} name='title' placeholder='Card Title' value={formValues.title} onChange={updateFormValues} />
      <Button type='submit' sx={{ height: '56px', flex: 1, marginLeft: 2 }}>Create</Button>
    </Box>
  )
}
