import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Skeleton} from "@mui/material";

const SearchBarLoadingItem = () => {
    return (
        <Grid container style={{display: 'flex', flexDirection:'row', marginBottom:'5px'}}>
            <Grid item xs={4}>
                <Skeleton variant="rectangular" width='100%' height='100%'/>
            </Grid>
            <Grid item xs={8} style={{marginTop:'5px'}}>
                <Container>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </Container>
            </Grid>
        </Grid>
    );
}

export default SearchBarLoadingItem