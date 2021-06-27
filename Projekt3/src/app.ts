import { weather } from "./classes/weather";
import { weatherChosenCities } from "./classes/weatherChosenCities";

export class App {
    
    AllWeatherResult:Array<any> = [];
    constructor() {
        new weatherChosenCities('krakow');
        // new weatherChosenCities('zakopane');
        // new weatherChosenCities('warszawa');
        // this.AllWeatherResult.push(new weatherChosenCities('krakow'));
        // this.AllWeatherResult.push(new weatherChosenCities('zakopane'));
        // this.AllWeatherResult.push(new weatherChosenCities('warszawa'));
        // console.log('result array',this.AllWeatherResult);
    }

}


