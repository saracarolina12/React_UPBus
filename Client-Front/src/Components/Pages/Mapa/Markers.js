import React, {useState, useEffect} from "react";
import { Marker } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { createUser, SearchUser, LastIDs, updatePassword, NewLocation} from '../../../Api/index.js';
    
// import Geocoder from 'react-native-geocoding';  

const Markers = () =>{
    const [state, setState] = useState({
        longitude: 0,
        latitude: 0,
    });

    const [address, setAddress] = useState();
      useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            function (position){
                setState({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                });
        }, 
        function(error){
            console.error("Error Code = " + error.code + " - " + error.message);
        },
        {
            enableHighAccuracy: true,
        }
        );
    }, []);

    const positions ={lat: state.latitude, lng:state.longitude};
    let apikey = 'h-ymyFJJoXJ3Snoy3pmiW6he5QsNgNA9Djha8HfbMDI';
    //REVERSE (address)
    function getAddressFromCoordinates(url) {   
        // console.log("latiii jiji: ", CurrLAT, "  long: ", CurrLNG);
        //url =JSON.parse(JSON.stringify(url))
        return new Promise((resolve) => {
            //console.log(url);
            fetch(url)
            .then(res => res.json())
            //.then(text => console.log(text))
            .then((resJson) => {
              if (resJson
                && resJson.Response
                && resJson.Response.View
                && resJson.Response.View[0]
                && resJson.Response.View[0].Result
                && resJson.Response.View[0].Result[0]) {
                resolve(resJson.Response.View[0].Result[0].Location.Address.Label);
                //console.log(resJson.Response.View[0].Result[0].Location.Address.Label);
                setAddress(resJson.Response.View[0].Result[0].Location.Address.Label);
                localStorage.setItem('CurrentAdress', JSON.stringify(resJson.Response.View[0].Result[0].Location.Address.Label)); //User Location
                console.log("current address: ",address);
                NewLocation({ID:JSON.parse(localStorage.getItem('ID')), Location: address})

               //console.log("response JSON: ", resJson);
              } else {
                console.log("resolve: ", resolve()); 
                //resolve()
              }
            })
            .catch((e) => {
              console.log('Error in getAddressFromCoordinates: ', e)
              resolve()
            })
        })
      }      
    //REVERSE (address)

    if((state.latitude != 0 && state.longitude != 0)){
        console.log(positions);
        localStorage.setItem('LAT_Curr', JSON.stringify(positions.lat)); //guardo en variable global
        localStorage.setItem('LNG_Curr', JSON.stringify(positions.lng));
        var CurrLAT = JSON.parse(localStorage.getItem('LAT_Curr')), CurrLNG = JSON.parse(localStorage.getItem('LNG_Curr'));
        const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${apikey}&mode=retrieveAddresses&prox=${CurrLAT},${CurrLNG}`
        getAddressFromCoordinates(url);

    }else{
        console.log("VACÍOOOOOOOOOO, coordenadas de la UP: ");
        localStorage.setItem('LAT_UP', JSON.stringify(21.824206943866415)); //guardo en variable global 
        localStorage.setItem('LNG_UP', JSON.stringify(-102.28368472570067)); //guardo en variable global 
        const urlUP = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${apikey}&mode=retrieveAddresses&prox=21.824206943866415,-102.28368472570067`
        getAddressFromCoordinates(urlUP);
    }

    var redIcon = new Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    return(
        <>
        {(state.latitude != 0 && state.longitude != 0) &&
            <Marker position={{lat:state.latitude, lng:state.longitude}} icon={redIcon}/>
        }
        </>
    );
}
export default Markers;