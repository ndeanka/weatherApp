import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WeatherService } from '../service/weather.service';
import { WeatherData } from '../module/weather.module';
import {HttpErrorResponse} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class WeatherComponent implements OnInit, OnDestroy {
  constructor(private weatherService: WeatherService, private spinner:NgxSpinnerService) {}

  destroy$: Subject<boolean> = new Subject();

  weatherData?: WeatherData;
  cityName: string = 'Dodoma';


  ngOnInit() {
    this.onGetWeatherDetails(this.cityName);
    this.cityName = '';
    this.spinner.show().then();


    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

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
        error: (error: any) => {
          // Logging any errors that occurred during the API call
          console.error('Error retrieving weather data:', error);

          if (error instanceof HttpErrorResponse) {
            console.error(`HTTP Error Status: ${error.status}`);
            console.error(`Error Message: ${error.message}`);
          } else {
            console.error('An unexpected error occurred:', error);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
