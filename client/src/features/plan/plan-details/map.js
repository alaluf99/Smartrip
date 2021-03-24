import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MyMap() {
    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAp7Hcn5YYm3og3yrA4W2UXZF7rO8jfhWo' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}