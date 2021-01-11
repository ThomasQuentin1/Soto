import { Typography, Card, CardContent, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';
import CloseIcon from '@material-ui/icons/Close';
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
    name: string;
    city: string;
    lng: number;
    lat: number;
    id: number;
}

const MapComponent = ({name, city, id} : MapComponentProps) => {
    const classes = useStyles();

    const [isToggled, setIsToggled] = useState(false);
    const [shopSetted, isShopSetted] = useState(false);

    // when the shop is setted, redirect to the index page
    if (shopSetted) {
      // here redirect to the index
      console.log("shop setted");

    }
    
    const [SetShop] = useSetShopMutation({ variables: {id: id}, errorPolicy: 'all'})
    return (
        <div>
            {isToggled && 
            <Card color="secondary" className={classes.root} style={{position:'relative'}}>
                    <CloseIcon onClick={() => setIsToggled(!isToggled)} style={{color: 'black', position:'absolute', right:'5px', top:'5px'}}/>
                <CardContent color="secondary">
                    <Typography color="secondary" variant="subtitle1">{name}</Typography>
                    <Typography color="secondary" variant="subtitle2">{city}</Typography>
                    <Button color="secondary" style={{border:'1px solid', marginTop:'15px'}}
                    onClick={() => SetShop().then((err) => {
                        if (err.errors) {
                            console.log(err.errors[0].message);
                        } else {
                            isShopSetted(!shopSetted)}
                        }
                        )}><Typography>Choisir ce drive</Typography></Button>
                </CardContent>
            </Card>}
            {!isToggled &&
            <RoomIcon onClick={() => setIsToggled(!isToggled)} color="secondary"/>}
        </div>);
}

export default MapComponent;