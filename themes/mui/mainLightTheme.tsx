import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const muiLightTheme = createMuiTheme({
    palette: {
      secondary: {
        main: blue[500],
        contrastText: '#fff',
      },
    },
  });

export default muiLightTheme;
