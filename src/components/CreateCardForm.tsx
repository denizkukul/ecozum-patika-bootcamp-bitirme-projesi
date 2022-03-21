import { useForm } from "../hooks/useForm"
import { CreateCardRequest } from "../services/server/controllers/card"

type CreateCardFormProps = {
  listID: number
  onSubmit: (formValues: CreateCardRequest) => void
}

export const CreateCardForm: React.FC<CreateCardFormProps> = ({ listID, onSubmit }) => {
  const { formValues, updateFormValues } = useForm({ defaultValues: { title: '', description: '', listId: listID } });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  }

  return (
    <form style={{ margin: '10px' }} className="card" onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Card Title" onChange={updateFormValues} />
      <input name='description' type="text" placeholder="Description" onChange={updateFormValues} />
      <button style={{ marginTop: 'auto' }}>Create Card</button>
    </form>
  )
}
