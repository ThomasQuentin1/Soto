import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';

const SearchBarLoadingItem = () => {
    return (
        <Grid container style={{display: 'flex', flexDirection:'row', marginBottom:'5px'}}>
            <Grid item xs={4}>
                <Skeleton variant="rect" width='100%' height='100%'/>
            </Grid>
            <Grid item xs={8} style={{marginTop:'5px'}}>
                <Container>
                    <Skeleton variant="circle" width={40} height={40} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </Container>
            </Grid>
        </Grid>
    );
}

export default SearchBarLoadingItem