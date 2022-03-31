import Typography from '@mui/material/Typography/Typography';

const style = {
  fontFamily: 'Poppins',
  fontSize: '24px',
  fontWeight: '700',
  textAlign: 'center',
  display: 'inline',
  width: '100%'
}

type TitleProps = {
  main?: boolean
}

export const Title: React.FC<TitleProps> = ({ main, children }) => {
  style.fontSize = main ? '28px' : '24px'
  return (
    <Typography color='primary.contrastText' sx={style}>{children}</Typography>
  )
}
