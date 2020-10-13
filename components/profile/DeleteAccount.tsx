import React, {useState} from "react";
import {
    Button, createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import Router from "next/router";
import {gql} from "@apollo/client/core";
import {makeStyles} from "@material-ui/styles";
import {useMutation} from "@apollo/client";
import {sha256} from "js-sha256";
import {loginError, loginSuccess} from "../../public/notifications/notificationsFunctions";
import Cookies from "js-cookie";

const useStyles = makeStyles(createStyles({
        buttonProgress: {
            position: 'absolute'
        },
        textField: {
            marginTop: "10px",
            marginBottom: "10px"
        }
    }),
);

// const deleteAccount = async () : Promise<[boolean, string]> => {
// //
//     // const headers = new Headers();
//     // headers.append("Content-Type", "application/json");
//     //
//     // const raw = JSON.stringify({
//     //     username: username,
//     //     email: email
//     // });
//     // try {
//     //     const response = (await (
//     //         await fetch("http://localhost:5000/deleteAccount", {
//     //             method: "POST",
//     //             body: raw,
//     //             headers
//     //         })
//     //     ).json()) as RegisterResponse;
//     //     return [response.success, response.message];
//     // } catch (error) {
//     //     return [false, "Connection error"]
//     // }
//
//     console.log("account deleted")
//     return [true, "not implemented yet"]
// }


export const DELETE_ACCOUNT = gql`
    mutation RemoveAccount($password: String!) {removeAccount (passwordSHA256: $password)}`;

const DeleteAccount = () => {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("")
    const classes = useStyles();
    const [deleteAccount] = useMutation(DELETE_ACCOUNT, { variables: {password: sha256(password)}, errorPolicy: 'all'})

    let lng : string | null = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng');
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            {/*<div>*/}
            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
            {lng == 'fr' ? 'Supprimer compte' : 'Delete Account'}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete your account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {lng == 'fr' ? 'Voulez-vous vraiment supprimer votre compte ?' :'Are you sure you want to delete your SOTO account?'}
                        <TextField
                            color="secondary"
                            className={classes.textField}
                            id="delete-account-password"
                            type="password"
                            label={lng == 'fr' ? "Mot de passe" : "Password"}
                            value={password}
                            onChange={(sender: any) => setPassword(sender.target.value)}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{display: "flex", justifyContent: "space-between"}}>
                    <Button onClick={handleClose} color="secondary">
                        {lng == 'fr' ? 'Non c\'était une erreur' : 'No that was a mistake, sorry'}
                    </Button>
                    <Button color="secondary" disabled={password === ""} autoFocus onClick={() => {
                        handleClose;
                        console.log(sha256(password))
                        deleteAccount().then(r => {
                            if (r.errors)
                                loginError(r.errors[0].message)
                            else {
                                loginSuccess("Logged out")
                                Cookies.remove("token")
                                Router.push("/")
                            }
                        })
                        // deleteAccount().then(function(value) {
                        //     if (value[0]) {
                        //         console.log(value[1])
                        //         Router.push("/")
                        //     }
                        //     else
                        //         console.log(value[1])
                        // })
                    }}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteAccount;