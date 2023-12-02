import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {WeatherData} from '../module/weather.module';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherAPI: string = environment.weatherApiBaseUrl;

  private headers: HttpHeaders = new HttpHeaders()
    .set(
      environment.XRapidAPIHostHeaderName,
      environment.XRapidAPIHostHeaderValue
    )
    .set(environment.XRapidAPIKeyName, environment.XRapidAPIKeyValue);

  constructor(private http: HttpClient) {
  }

  getWeatherData(cityData: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(this.weatherAPI, {
      headers: this.headers,
      params: new HttpParams().set('q', cityData).set('days', 3)
    });
  }
}
