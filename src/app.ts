import './app.css';

import { WeatherService } from './services';

let weatherService = new WeatherService();

let map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
});

let markers: google.maps.Marker[] = [];

function locate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(pos);

            weatherService.getWeather(position, 50, true).then((response: weather.ICitiesInfos) => {
                let infoWindowOptions = {
                    map: map
                };
                let infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.close();

                let bounds = new google.maps.LatLngBounds();

                response.list.forEach(city => {
                    let marker = new google.maps.Marker({
                        position: {
                            lat: city.coord.lat,
                            lng: city.coord.lon
                        },
                        map: map,
                        title: 'Click to view weather information',
                    });
                    marker.addListener('click', () => {
                        infoWindow.setContent(`
                        <div>${city.name} ${city.main.temp}&#8451;</div>
                        `)
                        infoWindow.open(map, marker);
                    });

                    markers.push(marker);
                    bounds.extend(marker.getPosition());
                });

                map.fitBounds(bounds);
            });
        }, () => errorHendler('The Geolocation service failed.'));
    } else {
        errorHendler('Your browser doesn\'t support geolocation.');
    }
}

function errorHendler(message: string) {
    document.getElementById('errors').textContent = message;
}

locate();