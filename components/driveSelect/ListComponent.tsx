import { Typography, Card, CardContent, Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

interface ListComponentProps {
    name: string;
    city: string;
    id: number;
}

const ListComponent = ({name, city, id} : ListComponentProps) => {
    const classes = useStyles();

    const [isToggled, setIsToggled] = useState(false);
    const [shopSetted, isShopSetted] = useState(false);

    // when the shop is setted, redirect to the index page
    if (shopSetted) {
        console.log("shop setted");
      // here redirect to the index
    }
    
    const [SetShop] = useSetShopMutation({ variables: {id: id}, errorPolicy: 'all'})
    return (
        <Grid item>
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
        </Grid>

            );
}

export default ListComponent;