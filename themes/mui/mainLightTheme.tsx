import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const muiLightTheme = createMuiTheme({
    shape : {
      borderRadius: 10,
    },
    palette: {
      text: {
        primary: '#000000',
      },
      secondary: {
        main: blue[500],
        contrastText: '#fff',
      },
    },
  });

export default muiLightTheme;
