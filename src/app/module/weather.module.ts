// export interface WeatherData {
//   coord: Coord;
//   weather: Weather[];
//   base: string;
//   main: Main;
//   visibility: number;
//   wind: Wind;
//   clouds: Clouds;
//   dt: number;
//   sys: Sys;
//   timezone: number;
//   id: number;
//   name: string;
//   cod: number;
// }
//
// export interface Coord {
//   lon: number;
//   lat: number;
// }
//
// export interface Weather {
//   id: number;
//   main: string;
//   description: string;
//   icon: string;
// }
//
// export interface Main {
//   temp: number;
//   feels_like: number;
//   temp_min: number;
//   temp_max: number;
//   pressure: number;
//   humidity: number;
//   sea_level: number;
//   grnd_level: number;
// }
//
// export interface Wind {
//   speed: number;
//   deg: number;
//   gust: number;
// }
//
// export interface Clouds {
//   all: number;
// }
//
// export interface Sys {
//   country: string;
//   sunrise: number;
//   sunset: number;
// }


export interface WeatherData {
  location: Location
  current: Current
}

export interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export interface Current {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
}

export interface Condition {
  text: string
  icon: string
  code: number
}

