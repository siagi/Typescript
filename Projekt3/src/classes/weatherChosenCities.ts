import { weather } from "./weather";

export class weatherChosenCities{
    city:string
    constructor(city:string){
       this.city = city;
       this.getWeatherCityResult();
    }
    // AllWeatherResult.push(result);
    // console.log(AllWeatherResult)
    
        async getWeatherCityResult(){
            const weatherCity = new weather(this.city);
            const result =  await weatherCity.weatherResult;
            const cityWeather={
                name:result.name,
                temp:result.main.temp-273.15,
                temp_min:result.main.temp_min-273.15,
                temp_max:result.main.temp_max-273.15,
            }
            console.log(cityWeather);
            return result;
    }
    
}

// export const AllWeatherResult:Array<any> = [];
