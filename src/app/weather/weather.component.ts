import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WeatherService } from '../service/weather.service';
import { WeatherData } from '../module/weather.module';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class WeatherComponent implements OnInit, OnDestroy {
  constructor(private weatherService: WeatherService) {}

  destroy$: Subject<boolean> = new Subject();

  weatherData?: WeatherData;
  cityName: string = 'Dodoma';

  ngOnInit() {
    this.onGetWeatherDetails(this.cityName);
    this.cityName = '';
  
  }

 
  onSubmitForm(){
    this.onGetWeatherDetails(this.cityName);
    this.cityName = '';


  }

  // Calling the WeatherService to get weather data for the specified city
  onGetWeatherDetails(cityName: string) {
    this.weatherService
      .getWeatherData(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: WeatherData) => {
          this.weatherData = response;
          console.log(this.weatherData);
        },
        error: (error: WeatherData) => {
          // Logging any errors that occurred during the API call
          console.error('Error from Weather API:');
          console.error(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
