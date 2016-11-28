import { mockWeatherData } from './mockWeatherData';

export class WeatherService {

    private weatherApi: string = 'http://api.openweathermap.org/data/2.5/find';

    public getWeather(position: Position, citiesCount: number, isMock?: boolean): Promise<weather.ICitiesInfos> {
        if (isMock) {
            return new Promise((resolve) => {
                resolve(mockWeatherData);
            });
        }

        let url = `${this.weatherApi}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=${citiesCount}&appid=a8f5a2be89e408a117d1cbf534303578&units=metric`;
        return this.sendRequest(url);
    }

    public sendRequest<T>(url: string): Promise<T> {
        let promise = new Promise<T>((resolve, reject) => {
            let http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.onreadystatechange = () => {
                if (http.readyState === 4 && http.status === 200) {
                    resolve(JSON.parse(http.responseText));
                }
                if (http.readyState === 4 && http.status !== 200) {
                    reject('api error');
                }
            }
            http.send();
        });

        return promise;
    }
}