import LoginController from "../components/login/LoginController";
// import {makeStyles} from "@material-ui/styles";
// import {createStyles} from "@material-ui/core";

// const useStyles = makeStyles(
//     createStyles({
//         '@global': {
//         body: {
//             margin: 0,
//             background: "#CCCCCC"
//         }
//         },
//         root: {
//             '& > *': {
//                 height: "100%",
//                 width: "100%",
//                 margin: 0,
//             },
//         },
//     }),
// );

const LoginPage = () => {
    return (
        <div>
            <div>
                <LoginController/>
            </div>
        </div>
    );
}

export default LoginPage;
