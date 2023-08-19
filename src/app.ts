import axios from 'axios';

declare var google: any;

type GoogleGeocodingResponse = {
    results:
    {
        geometry:
        {
            location:
            { lat: number, lng: number }
        }
    }[],
    status : "OK" | "ZERO_RESULTS"

}


// Code goes here!
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const GOOGLE_MAPS_API_KEY = "AIzaSyCC - aFajBm6x1fN35dvXt_M3QnkZyPdPG4";


function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;  

    //! Не забудь закрыть billing счет при использовании google api
    axios.get<GoogleGeocodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_MAPS_API_KEY}`
    ).then(response => {

        if (response.data.status !== 'OK') {
            throw new Error("Could not fetch location!");
        }
        const coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById('map')!, {
            center: coordinates,
            zoom: 8

        });
          // The marker, positioned at Uluru
        new google.maps.Marker({
            map: map,
            position: coordinates,

        });

  
       
    })
        .catch(err => {
            alert(err.message);
        console.log(err);
    });
    

    //send this to Google`s API
}

form?.addEventListener("submit", searchAddressHandler);
