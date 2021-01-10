import { createMuiTheme } from '@material-ui/core/styles';

const muiLightTheme = createMuiTheme({
    shape : {
      borderRadius: 10,
    },
    palette: {
      text: {
        primary: '#000000',
      },
      secondary: {
        main: '#5f6caf',
        contrastText: '#fff',
      },
    },
  });

export default muiLightTheme;
