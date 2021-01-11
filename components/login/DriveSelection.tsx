import React from 'react';
import GoogleMapReact from 'google-map-react';
import MapComponent from './MapComponent';

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

    return (
    <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMapReact
            defaultCenter={defaultSettings.center}
            defaultZoom={defaultSettings.zoom}
            >
                {data && data.shopList.map((shopInfo, index) => {
                    return (<MapComponent
                        key={index}
                        lat={shopInfo.lat}
                        lng={shopInfo.long}
                        name={shopInfo.name}
                        city={shopInfo.city}
                        id={shopInfo.id}
                    />);
                })}
        </GoogleMapReact>
    </div>);
};

export default DriveSelection