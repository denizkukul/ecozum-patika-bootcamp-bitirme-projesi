import { useForm } from "../hooks/useForm"
import { CreateListRequest } from "../services/server/controllers/list"

type CreateListFormProps = {
  boardID: number
  onSubmit: (formValues: CreateListRequest) => void
}

export const CreateListForm: React.FC<CreateListFormProps> = ({ boardID, onSubmit }) => {
  const { formValues, updateFormValues } = useForm({ defaultValues: { title: '', boardId: boardID } });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  }

  return (
    <form className="list" onSubmit={handleSubmit}>
      <div style={{ color: 'white', textAlign: 'center', padding: '10px' }}>CREATE LIST</div>
      <input name="title" type="text" placeholder="List Title" onChange={updateFormValues} />
      <button style={{ marginTop: 'auto' }}>Create List</button>
    </form>
  )
}
