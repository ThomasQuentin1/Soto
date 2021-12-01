import {createTheme} from "@mui/material";

const muiLightTheme = createTheme({
    shape: {
        borderRadius: 10,
    },
    palette: {
        text: {
            primary: '#000000',
            secondary: '#5f6368',
        },
        primary: {
            main: '#3586e2 !important',
        },
        secondary: {
            main: '#ff6768 !important',
            contrastText: '#fff',
        },
        background: {
            paper: '#fff',
        }

    },
    components: {
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ffffff"
                }
            }
        }
    }
});

export default muiLightTheme;
