import { Button, TextField, Typography } from "@mui/material"
import Box from "@mui/material/Box/Box"
import { useForm } from "../hooks/useForm"
import { CreateListRequest } from "../services/server/controllers/list"

type CreateListFormProps = {
  boardID: number
  onSubmit: (formValues: CreateListRequest) => void
}

export const CreateListForm: React.FC<CreateListFormProps> = ({ boardID, onSubmit }) => {
  const { formValues, updateFormValues, clearFormValues } = useForm({ defaultValues: { title: '', boardId: boardID } });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    clearFormValues();
  }

  return (
    <Box sx={{ minWidth: '300px', height: '150px', borderRadius: '10px', border: '1px solid gray' }} component='form' onSubmit={handleSubmit}>
      <Box sx={{ p: 2, height: '60px', boxSizing: 'border-box', borderRadius: '10px 10px 0 0', bgcolor: 'whitesmoke' }}>
        <Typography color='primary' sx={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '600' }}>Create List</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', borderTop: '1px solid gray', p: 2 }}>
        <TextField name="title" type="text" value={formValues.title} placeholder="List Title" onChange={updateFormValues} />
        <Button type='submit' sx={{ height: '56px', flex: 1, marginLeft: 2 }}>Create</Button>
      </Box>
    </Box>
  )
}
