export const boardStyle = {
  overflow: 'auto',
  p: 2,
  pt: 3,
  height: '100%',
  display: 'flex',
  flex: 1
}

export const editFormStyle = {
  bgcolor: 'primary.dark',
  maxHeight: '32px',
  pl: '82px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center'
}

export const editInputStyle = {
  backgroundColor: 'white',
  borderRadius: '4px',
  color: 'primary.dark',
  fontFamily: 'Poppins',
  fontSize: '24px',
  fontWeight: '700',
  '&.MuiInput-root': {
    '.MuiInput-input': {
      p: 0,
      textAlign: 'center',
      maxWidth: '200px',
      maxHeight: '30px'
    }
  }
}

export const backButtonStyle = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '110px',
  position: 'absolute',
  left: '20px'
}

export const backLinkStyle = {
  display: 'block',
  height: '36px',
  width: '100%',
  textDecoration: 'none'
}

export const titleContainerStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
}


export const buttonContainerStyle = {
  position: 'relative',
  ':hover': {
    '.MuiIconButton-root': {
      '.MuiSvgIcon-root': {
        color: 'white'
      }
    }
  }
}

export const editButtonStyle = {
  position: 'absolute',
  right: '-45px',
  bottom: '0'
}

export const createListStyle = {
  width: '350px',
  display: 'flex',
  alignItems: 'center',
  bgcolor: 'secondary.main',
  p: 2,
}

export const createListButtonStyle = {
  height: '56px',
  flex: 1,
  marginLeft: 2,
  bgcolor: 'white'
}

export const newListButtonStyle = {
  py: 2,
  minHeight: '64px',
  width: '350px',
  bgcolor: 'secondary.main',
  ':hover': {
    bgcolor: 'primary.main',
    color: 'white'
  }
}