import { useForm } from "../hooks/useForm";
import { BoardRequest } from "../services/server/controllers/board";

type CreateBoardFormProps = {
  onSubmit: (formValues: BoardRequest) => void
}

export const CreateBoardForm: React.FC<CreateBoardFormProps> = ({ onSubmit }) => {
  const { formValues, updateFormValues } = useForm({ defaultValues: { title: '' } });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  }

  return (
    <form className='board-link-container' onSubmit={handleSubmit}>
      <div className='board-link'>
        <input name='title' type="text" onChange={updateFormValues} />
        <button>Create Board</button>
      </div>
    </form>
  )
}