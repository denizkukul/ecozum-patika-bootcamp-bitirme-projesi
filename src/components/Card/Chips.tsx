import { Chip, Tooltip } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Checklist } from '../../store/checklists/checklistsReducer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

const chipStyle = { height: 'min-content', p: 0.4, fontSize: '14px', mr: 1, mb: 1 }

type ChecklistChipProps = {
  checklistID: number
}

const getChecklistProgress = (checklist: Checklist) => {
  let completed = 0;
  let total = checklist.items.length;
  checklist.items.forEach(item => {
    item.isChecked && completed++
  })
  return `${completed}/${total}`
}

export const ChecklistChip: React.FC<ChecklistChipProps> = ({ checklistID }) => {
  const checklist = useAppSelector(state => state.app.checklists[checklistID]);
  return (
    <Tooltip title={checklist.title}>
      <Chip icon={<CheckCircleOutlineIcon sx={{ fontSize: '19px' }} />} color='primary' sx={chipStyle} label={getChecklistProgress(checklist)} />
    </Tooltip>
  )
}

type DuedateChipProps = {
  duedate: string
}

export const DuedateChip: React.FC<DuedateChipProps> = ({ duedate }) => {
  const formattedDuedate = format(parse(duedate, 'yyyy-mm-dd', new Date()), 'MMM do yy');
  return (
    <Chip icon={<AccessTimeIcon sx={{ fontSize: '19px' }} />} color='warning' sx={chipStyle} label={formattedDuedate} />
  )
}


