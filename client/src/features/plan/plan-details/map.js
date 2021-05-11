import React, { Component } from 'react';
import { ReactBingmaps } from 'react-bingmaps';

export default function Map({ locations }) {

    console.log(locations)
    const infoboxesWithPushPins = locations.map(l => {
        const {location} = l;
        return {
            "location": [location.Latitude, location.Longitude],
            "addHandler": "mouseover",
            "infoboxOption": { title: l.name, description: l.name },
            "pushPinOption": { title: 'Pushpin Title', description: 'Pushpin' },
        }
    });

    const center = locations[0].location;

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <ReactBingmaps
                bingmapKey="ArBlxpzzSR8urxsgYBZ7umU6Gf8V22QcAZs3P-PCkZ6r9TVrb7A2KeffHEMmafDl"
                center={[center.Latitude, center.Longitude]}
                infoboxesWithPushPins={infoboxesWithPushPins}
            >
            </ReactBingmaps>
        </div >
    );
}