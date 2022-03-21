import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { AddMemberForm } from "../components/AddMemberForm"
import { ListContainer } from "../components/ListContainer"
import { Loading } from "../components/Loading"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { Member, MemberRequest } from "../services/server/controllers/member/types"
import { addMember, deleteBoard, getBoard, removeMember, selectBoards } from "../store/appdataSlice"
import { logout, selectAuth } from "../store/authSlice"

const UserCard: React.FC<Member> = ({ ...member }) => {
  const dispatch = useAppDispatch();
  const handleRemoveMember = () => {
    dispatch(removeMember({ memberID: member.BoardMember.id, boardID: member.BoardMember.boardId }))
  }
  return (
    <div>{member.username}<button onClick={handleRemoveMember}>Remove</button></div>
  )
}

export const BoardContentPage = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);
  const auth = useAppSelector(selectAuth);
  const params = useParams();
  const boardID = Number(params.boardID);
  const [showMembers, setShowMembers] = useState(false)

  useEffect(() => {
    dispatch(getBoard(boardID));
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleShowMembers = () => {
    setShowMembers(prev => !prev);
  }

  const handleDeleteBoard = () => {
    dispatch(deleteBoard({ id: boardID }));
  }

  const handleAddMember = (formValues: MemberRequest) => {
    dispatch(addMember(formValues))
  }

  return (
    boards.status === 'idle' ?
      <div className='boardcontent-page' style={{ flex: 1, position: 'relative' }}>
        <div className='board-header'>
          <Link to={`/user${auth.value.userID}`}>Back to Boards</Link>
          <div style={{ marginLeft: 'auto', paddingLeft: '150px' }} className='boardtitle'>{boards.boardsData[boardID].title}</div>
          <div style={{ marginLeft: 'auto', textTransform: 'capitalize' }} className='username'>{auth.value.username}</div>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleShowMembers}>Board Members</button>
          <button onClick={handleDeleteBoard}>Delete Board</button>
          {
            showMembers &&
            <div style={{ position: 'absolute', backgroundColor: 'white' }}>
              {
                boards.boardsData[boardID].members.map((member) => {
                  return (
                    <UserCard key={member.id} {...member} />
                  )
                })
              }
              <AddMemberForm boardId={boardID} onSubmit={handleAddMember} />
            </div>
          }
        </div>
        <ListContainer listIDs={boards.boardsData[boardID].listIDs} boardID={boardID} />
      </div > :
      <Loading />
  )
}

function removeUser(): any {
  throw new Error("Function not implemented.")
}
