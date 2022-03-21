import { useForm } from "../hooks/useForm";
import { MemberRequest } from "../services/server/controllers/member/types";

type AddMemberFormProps = {
  boardId: number
  onSubmit: (formValues: MemberRequest) => void
}

export const AddMemberForm: React.FC<AddMemberFormProps> = ({ onSubmit, boardId }) => {
  const { formValues, updateFormValues } = useForm({ defaultValues: { username: '', boardId } });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  }

  return (
    <form className='addmember-form' onSubmit={handleSubmit}>
      <input name='username' type='text' placeholder="Username" onChange={updateFormValues} />
      <button>Add Member</button>
    </form>
  )
}