import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Router from "next/router";

const deleteAccount = async () : Promise<[boolean, string]> => {
//
    // const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    //
    // const raw = JSON.stringify({
    //     username: username,
    //     email: email
    // });
    // try {
    //     const response = (await (
    //         await fetch("http://localhost:5000/deleteAccount", {
    //             method: "POST",
    //             body: raw,
    //             headers
    //         })
    //     ).json()) as RegisterResponse;
    //     return [response.success, response.message];
    // } catch (error) {
    //     return [false, "Connection error"]
    // }

    console.log("account deleted")
    return [true, "not implemented yet"]
}

const DeleteAccount = () => {
    const [open, setOpen] = React.useState(false);

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
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{display: "flex", justifyContent: "space-between"}}>
                    <Button onClick={handleClose} color="secondary">
                        {lng == 'fr' ? 'Non c\'était une erreur' : 'No that was a mistake, sorry'}
                    </Button>
                    <Button color="secondary" autoFocus onClick={() => {
                        handleClose;
                        deleteAccount().then(function(value) {
                            if (value[0]) {
                                console.log(value[1])
                                Router.push("/index")
                            }
                            else
                                console.log(value[1])
                        })
                    }}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteAccount;