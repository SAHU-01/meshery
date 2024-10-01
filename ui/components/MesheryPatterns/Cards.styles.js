import { styled } from '@mui/material/styles';

export const CardButtons = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '50px',
  height: '100%',
  gap: '.5rem',
}));

export const TestsButton = styled('button')({
  padding: '6px 9px',
});

export const PerfResultsContainer = styled('div')({
  marginTop: '0.5rem',
});

export const FlipButton = styled('button')({
  minWidth: 'max-content',
  padding: '6px 9px',
  whiteSpace: 'nowrap',
});

export const BackGrid = styled('div')({
  marginBottom: '0.25rem',
  minHeight: '6rem',
  position: 'relative',
});

export const UpdateDeleteButtons = styled('div')({
  width: 'fit-content',
  margin: '10px 0 0 auto',
  position: 'absolute',
  right: 0,
  bottom: 0,
});

export const YamlDialogTitle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const FullScreenCodeMirror = styled('div')({
  height: '100%',
  width: '100%',
  '& .CodeMirror': {
    minHeight: '300px',
    height: '100%',
    width: '100%',
  },
});

export const NoOfResultsContainer = styled('div')({
  margin: '0 0 1rem',
  '& div': {
    display: 'flex',
    alignItems: 'center',
  },
});

export const BottomPart = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginTop: '1rem',
});

export const LastRunText = styled('div')({
  marginRight: '0.5rem',
});

export const CardHeaderRight = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export const IconPatt = styled('img')({
  width: '24px',
  height: '24px',
  marginRight: '5px',
});

export const IconDownload = styled('img')({
  width: 'auto',
  height: '24px',
});

export const BtnText = styled('span')(({ theme }) => ({
  [theme.breakpoints.down(1370)]: { display: 'none' },
  [`${theme.breakpoints.up(1920)} and (max-width: 2200px)`]: {
    display: 'none',
  },
  marginLeft: '5px',
  display: 'flex',
  justifyContent: 'center',
}));

export const CloneBtnText = styled('span')(({ theme }) => ({
  [theme.breakpoints.down(1370)]: { display: 'none' },
  [`${theme.breakpoints.up(1920)} and (max-width: 2200px)`]: {
    display: 'none',
  },
  display: 'flex',
  justifyContent: 'center',
  marginLeft: '3px',
}));

export const UndeployButton = styled('button')({
  backgroundColor: '#8F1F00',
  color: '#ffffff',
  padding: '6px 9px',
  minWidth: 'unset',
  '&:hover': {
    backgroundColor: '#B32700',
  },
  '& > span': {
    width: 'unset',
  },
  '& > span > svg': {
    marginRight: '5px',
  },
});

export const Img = styled('img')(({ theme }) => ({
  marginRight: '0.5rem',
  filter: theme.palette.secondary.img,
}));

export const NoPaper = styled('div')({
  padding: '0.5rem',
  fontSize: '3rem',
});

export const NoContainer = styled('div')({
  padding: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const NoText = styled('div')({
  fontSize: '2rem',
  marginBottom: '2rem',
});

export const ClonePatt = styled('img')({
  width: '20px',
  height: '20px',
  marginRight: '5px',
});
