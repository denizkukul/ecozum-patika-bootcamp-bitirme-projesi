import Typography from '@mui/material/Typography/Typography';

const style = {
  fontFamily: 'Poppins',
  fontSize: '24px',
  fontWeight: '700',
  textAlign: 'center',
  display: 'inline',
  width: '100%'
}

export const Title: React.FC = ({ children }) => {
  return (
    <Typography color='primary.contrastText' sx={style}>{children}</Typography>
  )
}
