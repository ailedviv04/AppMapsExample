"use client";
import React, { useState } from "react";
import styles from '../styles/company.module.scss';
import Input from "@/components/input";

import GoogleMap from 'google-map-react';
import Marker from '../components/map/Marker';
import Polyline from '../components/map/Polyline';

interface HomeProps {
  markers: [
    {lat: 53.42728, lng: -6.24357},
    {lat: 43.681583, lng: -79.61146}
  ],
  center: {
    lat: 10.99835602,
    lng: 77.01502627
  },
  zoom: 4
}

export default function Home(props: HomeProps) {
  const [vals, setVals] = useState({
    origin: "",
    longitude1: "",
    latitude1: "",
    destination: "",
    longitude2: "",
    latitude2: "",
  });
  const [values, setValues] = useState({
    mapsLoaded: false,
    map: null,
    maps: null
  });

  function onMapLoaded(map :any, maps :any) {
    fitBounds(map, maps)

    setValues({
      ...values,
      mapsLoaded: true,
      map: values.map,
      maps: values.maps
    })
  }

  function fitBounds (map :any, maps :any) {
    var bounds = new maps.LatLngBounds()
    for (let marker of props.markers) {
      bounds.extend(
        new maps.LatLng(marker.lat, marker.lng)
      )
    }
    map.fitBounds(bounds)
  }

  function afterMapLoadChanges () {
    return (
      <div style={{display: 'none'}}>
        <Polyline
          map={values.map}
          maps={values.maps}
          markers={props.markers} />
      </div>
    )
  }

  const handleChange = (e : any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setVals({
      ...vals,
      [name]: value,
    });
  };

  return (
    <div className={styles.content}>
      <div className={styles.row}>
        <div className={styles.sizeW}>
          <Input
            label={"Origen"}
            name={"origin"}
            onChange={handleChange}
            value={vals.origin}
            placeholder="Dirección"
            type="text"
          />
          <h6 className={styles.spaceTitle}>Punto de Control</h6>
          <div className={styles.wrapperInputs}>
            <div className={styles.inputLeft}>
              <Input
                label="Longitud"
                name="longitude1"
                onChange={handleChange}
                value={vals.longitude1}
                placeholder="Longitud"
                type="text"
              />
            </div>
            <div className={styles.inputRight}>
              <Input
                label="Latitud"
                name="latitude1"
                onChange={handleChange}
                value={vals.latitude1}
                placeholder="Latitud"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.sizeW}>
          <Input
            label={"Destino"}
            name={"destination"}
            onChange={handleChange}
            value={vals.destination}
            placeholder="Dirección"
            type="text"
          />
          <h6 className={styles.spaceTitle}>Punto de Control</h6>
          <div className={styles.wrapperInputs}>
            <div className={styles.inputLeft}>
              <Input
                label="Longitud"
                name="longitude2"
                onChange={handleChange}
                value={vals.longitude2}
                placeholder="Longitud"
                type="text"
              />
            </div>
            <div className={styles.inputRight}>
              <Input
                label="Latitud"
                name="latitude2"
                onChange={handleChange}
                value={vals.latitude2}
                placeholder="Latitud"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.sizeW}>
        <GoogleMap
        bootstrapURLKeys={{key: 'AIzaSyCXaWYQnmgz2uBbGieSRQhKMT8vIQAiN_U'}}
        style={{height: '100vh', width: '100%'}}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        onGoogleApiLoaded={({map, maps}) => onMapLoaded(map, maps)}>
        <Marker text={'DUB'} lat={53.42728} lng={-6.24357} />
        <Marker text={'YYZ'} lat={43.681583} lng={-79.61146} />
        {values.mapsLoaded ? afterMapLoadChanges() : ''}
      </GoogleMap>
        </div>
      </div>
    </div>
  )
}
