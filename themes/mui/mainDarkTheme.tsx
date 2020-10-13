import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const muiDarkTheme = createMuiTheme({
    palette: {
      text: {
        secondary: '#FFFFFF',
      },
      secondary: {
        main: red[500],
        contrastText: '#fff'
      },
    },
  });

export default muiDarkTheme;