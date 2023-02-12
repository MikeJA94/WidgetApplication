import { Component, OnInit } from '@angular/core';
import { WeatherModel } from 'src/app/api/src/models/weather-model';
import { WidgetService } from 'src/app/api/src/services/widget.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  public weather: WeatherModel;


  constructor(private widgetService: WidgetService) {







  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude.toString();
      const lon = position.coords.longitude.toString();
      const sub = this.widgetService.widgetWeatherGet$Json({ latitude: lat, longitude: lon }).subscribe((weather) => {
        if (sub) {
          sub.unsubscribe();
        }
        this.weather = weather;

      });
    });





  }

}
