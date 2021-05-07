import { Typography, Button, Grid, Box } from '@material-ui/core';
import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import CloseIcon from '@material-ui/icons/Close';
import { useSetShopMutation } from 'typing';

// const useStyles = makeStyles({
//     root: {
//       minWidth: 275,
//     },
//     bullet: {
//       display: 'inline-block',
//       margin: '0 2px',
//       transform: 'scale(0.8)',
//     },
//     title: {
//       fontSize: 14,
//     },
//     pos: {
//       marginBottom: 12,
//     },
//   });

interface ListComponentProps {
    index: number;
    name: string;
    city: string;
    id: number;
    isToggled: boolean;
    ChangeMyValueCallback: any;
    ResetAllSelected: any;
}

const ListComponent = ({index, name, city, id, isToggled, ChangeMyValueCallback, ResetAllSelected} : ListComponentProps) => {
    // const classes = useStyles();

    // const [isToggled, setIsToggled] = useState(false);
    const [shopSetted, isShopSetted] = useState(false);

    // when the shop is setted, redirect to the index page
    if (shopSetted) {
        console.log("shop setted");
      // here redirect to the index
    }
    
    const [SetShop] = useSetShopMutation({ variables: {id: id}, errorPolicy: 'all'})
    return (
        <Grid item onMouseEnter={() => {
            ResetAllSelected()
            ChangeMyValueCallback(index)
        }}>
            {!isToggled && <Typography color="secondary" variant="subtitle1">{name}</Typography>}
            {isToggled && <Typography color="secondary" variant="subtitle1"><Box fontWeight="fontWeightBold">{name}</Box></Typography>}

            {!isToggled && <Typography color="secondary" variant="subtitle2">{city}</Typography>}
            {isToggled && <Typography color="secondary" variant="subtitle2"><Box fontWeight="fontWeightBold">{city}</Box></Typography>}
            
            <Button color="secondary" size='small' style={{border:'1px solid', marginTop:'15px'}}
            onClick={() => SetShop().then((err) => {
                if (err.errors) {
                    console.log(err.errors[0].message);
                } else {
                    isShopSetted(!shopSetted)}
                }
                )}>
                {!isToggled && <Typography variant='caption'>Choisir ce drive</Typography>}
                {isToggled && <Typography variant='caption'><Box fontWeight="fontWeightBold">Choisir ce drive</Box></Typography>}
            </Button>
        </Grid>

            );
}

export default ListComponent;