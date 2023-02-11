/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { HeadlineModel } from '../models/headline-model';
import { LocalResourceModel } from '../models/local-resource-model';
import { WeatherModel } from '../models/weather-model';

@Injectable({
  providedIn: 'root',
})
export class WidgetService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation widgetWeatherGet
   */
  static readonly WidgetWeatherGetPath = '/Widget/weather';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `widgetWeatherGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  widgetWeatherGet$Plain$Response(params?: {
    latitude?: string;
    longitude?: string;
  }): Observable<StrictHttpResponse<WeatherModel>> {

    const rb = new RequestBuilder(this.rootUrl, WidgetService.WidgetWeatherGetPath, 'get');
    if (params) {
      rb.query('latitude', params.latitude, {});
      rb.query('longitude', params.longitude, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<WeatherModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `widgetWeatherGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  widgetWeatherGet$Plain(params?: {
    latitude?: string;
    longitude?: string;
  }): Observable<WeatherModel> {

    return this.widgetWeatherGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<WeatherModel>) => r.body as WeatherModel)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `widgetWeatherGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  widgetWeatherGet$Json$Response(params?: {
    latitude?: string;
    longitude?: string;
  }): Observable<StrictHttpResponse<WeatherModel>> {

    const rb = new RequestBuilder(this.rootUrl, WidgetService.WidgetWeatherGetPath, 'get');
    if (params) {
      rb.query('latitude', params.latitude, {});
      rb.query('longitude', params.longitude, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<WeatherModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `widgetWeatherGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  widgetWeatherGet$Json(params?: {
    latitude?: string;
    longitude?: string;
  }): Observable<WeatherModel> {

    return this.widgetWeatherGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<WeatherModel>) => r.body as WeatherModel)
    );
  }

  /**
   * Path part for operation widgetHeadlinesGet
   */
  static readonly WidgetHeadlinesGetPath = '/Widget/headlines';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `widgetHeadlinesGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  widgetHeadlinesGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<Array<HeadlineModel>>> {

    const rb = new RequestBuilder(this.rootUrl, WidgetService.WidgetHeadlinesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<HeadlineModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `widgetHeadlinesGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  widgetHeadlinesGet$Plain(params?: {
  }): Observable<Array<HeadlineModel>> {

    return this.widgetHeadlinesGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<HeadlineModel>>) => r.body as Array<HeadlineModel>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `widgetHeadlinesGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  widgetHeadlinesGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<Array<HeadlineModel>>> {

    const rb = new RequestBuilder(this.rootUrl, WidgetService.WidgetHeadlinesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<HeadlineModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `widgetHeadlinesGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  widgetHeadlinesGet$Json(params?: {
  }): Observable<Array<HeadlineModel>> {

    return this.widgetHeadlinesGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<HeadlineModel>>) => r.body as Array<HeadlineModel>)
    );
  }

  /**
   * Path part for operation widgetLocalresourcesGet
   */
  static readonly WidgetLocalresourcesGetPath = '/Widget/localresources';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `widgetLocalresourcesGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  widgetLocalresourcesGet$Plain$Response(params?: {
    searchKey?: string;
  }): Observable<StrictHttpResponse<Array<LocalResourceModel>>> {

    const rb = new RequestBuilder(this.rootUrl, WidgetService.WidgetLocalresourcesGetPath, 'get');
    if (params) {
      rb.query('searchKey', params.searchKey, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LocalResourceModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `widgetLocalresourcesGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  widgetLocalresourcesGet$Plain(params?: {
    searchKey?: string;
  }): Observable<Array<LocalResourceModel>> {

    return this.widgetLocalresourcesGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LocalResourceModel>>) => r.body as Array<LocalResourceModel>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `widgetLocalresourcesGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  widgetLocalresourcesGet$Json$Response(params?: {
    searchKey?: string;
  }): Observable<StrictHttpResponse<Array<LocalResourceModel>>> {

    const rb = new RequestBuilder(this.rootUrl, WidgetService.WidgetLocalresourcesGetPath, 'get');
    if (params) {
      rb.query('searchKey', params.searchKey, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LocalResourceModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `widgetLocalresourcesGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  widgetLocalresourcesGet$Json(params?: {
    searchKey?: string;
  }): Observable<Array<LocalResourceModel>> {

    return this.widgetLocalresourcesGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LocalResourceModel>>) => r.body as Array<LocalResourceModel>)
    );
  }

}
