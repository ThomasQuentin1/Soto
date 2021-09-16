import { createMuiTheme } from '@material-ui/core/styles';
// import { red } from '@material-ui/core/colors';

const muiDarkTheme = createMuiTheme({
    shape: {
        borderRadius: 10,
    },

    palette: {
        text: {
            primary: '#ffffff',
            secondary: '#95989C',
        },

        secondary: {
            main: '#ff6768',
            contrastText: '#fff'
        },
    },
    overrides: {
        MuiCard: {
            root: {
                backgroundColor: "#263859",
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: "#263859",
            }
        },
        MuiDivider: {
            root: {
                backgroundColor: "#263859"
            }
        }
    }
});

export default muiDarkTheme;