import { createMuiTheme } from '@material-ui/core/styles';

const muiLightTheme = createMuiTheme({
    shape : {
        borderRadius: 10,
    },
    palette: {
        text: {
            primary: '#000000',
        },
        primary: {
            main: '#3586e2',
        },
        secondary: {
            main: '#fff',
            contrastText: '#3586e2',
        },

    },
});

export default muiLightTheme;
