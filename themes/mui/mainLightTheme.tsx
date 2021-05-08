import { createMuiTheme } from '@material-ui/core/styles';

const muiLightTheme = createMuiTheme({
    shape : {
        borderRadius: 10,
    },
    palette: {
        text: {
            primary: '#000000',
            secondary: '#5f6368',
        },
        primary: {
            main: '#3586e2',
        },
        secondary: {
            main: '#fff',
            contrastText: '#3586e2',
        },
        background: {
            paper: '#edf7fa',
        }

    },
});

export default muiLightTheme;
