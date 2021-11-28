// import { createMuiTheme } from '@material-ui/core/styles';
// import { red } from '@material-ui/core/colors';

import {createTheme} from "@mui/material";

const muiDarkTheme = createTheme({
    shape: {
        borderRadius: 10,
    },

    palette: {
        text: {
            primary: '#ffffff',
            secondary: '#95989C',
        },

        secondary: {
            main: '#ff6768 !important',
            contrastText: '#fff'
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#263859",
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#263859",
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: "#263859"
                }
            }
        }
    }
});

export default muiDarkTheme;