import { Typography, Card, CardContent, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import RoomIcon from '@mui/icons-material/Room'
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useSetShopMutation } from 'typing';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

interface MapComponentProps {
    index: number;
    name: string;
    city: string;
    lng: number;
    lat: number;
    id: number;
    isToggled: boolean;
    ChangeMyValueCallback: any;
    ResetAllSelected: any;
}

// index --> used for the code
// id --> used for the database
const MapComponent = ({index, name, city, id, isToggled, ChangeMyValueCallback, ResetAllSelected} : MapComponentProps) => {
    const classes = useStyles();

    const [shopSetted, isShopSetted] = useState(false);

    // when the shop is setted, redirect to the index page
    if (shopSetted) {
      // here redirect to the index

    }
    
    const [SetShop] = useSetShopMutation({ variables: {shopId: id}, errorPolicy: 'all'})
    return (
        <div>
            {isToggled && 
            <Card color="secondary" className={classes.root + " mapCard"} style={{position:'relative'}}>
                    <CloseIcon onClick={() => ResetAllSelected()} style={{color: 'black', position:'absolute', right:'5px', top:'5px'}}/>
                <CardContent color="secondary">
                    <Typography color="primary" variant="subtitle1">{name}</Typography>
                    <Typography color="primary" variant="subtitle2">{city}</Typography>
                    <Button color="primary" style={{border:'1px solid', marginTop:'15px'}}
                    onClick={() => { 
                        console.log(id);
                        SetShop().then((err) => {
                          if (err.errors) {
                              console.log(err.errors[0].message);
                          } else {
                            console.log("shop setted");
                            isShopSetted(!shopSetted)}
                          }
                        )}}><Typography>Choisir ce drive</Typography></Button>
                </CardContent>
            </Card>}
            {!isToggled &&
            <RoomIcon onClick={() => ChangeMyValueCallback(index)} color="secondary"/>}
        </div>);
}

export default MapComponent;