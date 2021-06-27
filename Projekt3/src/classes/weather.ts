export class weather{
    weatherResult:any;

    opwApiKey:string = '4fbaebef2258021ebe90a6ac57fd5f0d'
    constructor(city:string){

        this.weatherResult = this.getCityInfo(city)
    }

    async getCityInfo(city:string){
        const weather = await this.getWeather(city);
        return weather;
        
    }

    async getWeather(city:string):Promise<any>{
        const openWeatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.opwApiKey}`;
        const weatherResponse = await fetch(openWeatherApiUrl);
        const result = await weatherResponse.json();
        console.log(result);

        this.weatherResult = result;

        return result;
    }

}
