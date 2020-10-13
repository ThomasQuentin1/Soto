import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const muiDarkTheme = createMuiTheme({
    shape : {
      borderRadius: 10,
    },
    palette: {
      text: {
        primary: '#ffffff',
      },
      secondary: {
        main: red[500],
        contrastText: '#fff',
      },
    },
  });

export default muiDarkTheme;