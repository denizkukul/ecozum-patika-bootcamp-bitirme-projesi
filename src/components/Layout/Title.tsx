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
  main && (style.fontSize = '28px');
  return (
    <Typography color='primary.contrastText' sx={style}>{children}</Typography>
  )
}
