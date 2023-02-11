
import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ApiConfiguration } from './api/src/api-configuration';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { HeadLinesComponent } from './components/headlines/headlines.component';
import { WeatherComponent } from './components/weather/weather.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';


export function initApiConfiguration(appConfig: ApiConfiguration): Function {
  return () => {

    // read API rootUrl from environment...
    appConfig.rootUrl =  environment.apiEndPoint;
  };
}

export const GLOBAL_VARS: Object = {
  appName: 'Workflow API'
};

export const INIT_API_CONFIGURATION: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initApiConfiguration,
  deps: [ApiConfiguration],
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    HeadLinesComponent,
    WeatherComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule

  ],
  providers: [
    INIT_API_CONFIGURATION

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
