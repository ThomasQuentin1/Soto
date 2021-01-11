import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import MapComponent from './MapComponent';
import ListComponent from './ListComponent';
import { Grid, Input } from '@material-ui/core';

interface DriveSelectionProps {
    data: shopList;
}

interface shopList {
    shopList : shopInfo[];

}
interface shopInfo {
    name: string;
    city: string;
    long: number;
    lat: number;
    id: number;
}

const DriveSelection = ({data} : DriveSelectionProps) => {
    let defaultSettings = {
        center: {
          lat: 48.425563,
          lng: 7.638703
        },
        zoom: 11
      };

    const [input, setInput] = useState("");
    let filteredShopList : shopInfo[] = [];
    if (data) {
        filteredShopList = data.shopList.filter((item) => {
            if (input == "") {
                return item;
            } else {
                if (item.name.toLowerCase().includes(input.toLowerCase())) {
                    return item;
                }
            }
        });
    }
    return (
        <Grid container justify={'flex-start'}>
            <Grid container xs={9} style={{ height: '80vh'}}>
                <GoogleMapReact
                    defaultCenter={defaultSettings.center}
                    defaultZoom={defaultSettings.zoom}
                    >
                        {data && data.shopList.map((shopInfo, index) => {
                            return (
                            <MapComponent
                                key={index}
                                lat={shopInfo.lat}
                                lng={shopInfo.long}
                                name={shopInfo.name}
                                city={shopInfo.city}
                                id={shopInfo.id}
                            />);
                        })}
                </GoogleMapReact>
            </Grid>
            <Grid xs={3} style={{paddingLeft:'10px', maxHeight: '90vh', overflow:'auto'}}>
                <Grid container justify={"center"} style={{paddingBottom:"30px"}}>
                    <Input onChange={(event: any) => {
                        setInput(event.target.value)
                    }}
                    color='secondary' placeholder={"Search"}/>
                </Grid>
                <Grid container justify="flex-start" direction="column" spacing={5}>
                    {data && filteredShopList.map((shopInfo, index) => {
                        return (
                            <ListComponent
                                key={index}
                                name={shopInfo.name}
                                city={shopInfo.city}
                                id={shopInfo.id}
                            />);
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DriveSelection