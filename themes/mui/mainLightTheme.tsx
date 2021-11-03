import { createMuiTheme } from '@material-ui/core/styles';

const muiLightTheme = createMuiTheme({
    shape: {
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
            main: '#ff6768',

            contrastText: '#fff',
        },
        background: {
            paper: '#fff',
        }

    },
    overrides: {
        MuiDivider: {
            root: {
                backgroundColor: "#ffffff"
            }
        }
    }
});

export default muiLightTheme;
