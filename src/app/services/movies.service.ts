import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  CreditsMovie,
  DetailMovie,
  MoviesResponse,
  SearchMovie,
} from '../interfaces';

const url = environment.urlApi;
const api_key = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public popularPage: number = 0;

  constructor(private http: HttpClient) {}

  public getFeature(
    language: string = 'es',
    imageLanguage: string = 'es'
  ): Observable<MoviesResponse> {
    const { startDate, endDate } = this.buildDateInterval();

    return this.http.get<MoviesResponse>(`${url}/discover/movie`, {
      params: {
        api_key,
        language,
        include_image_language: imageLanguage,
        'primary_release_date.gte': startDate,
        'primary_release_date.lte': endDate,
      },
    });
  }

  public getPopular(
    language: string = 'es',
    imageLanguage: string = 'es'
  ): Observable<MoviesResponse> {
    const { startDate, endDate } = this.buildDateInterval();
    this.popularPage++;

    return this.http.get<MoviesResponse>(`${url}/discover/movie`, {
      params: {
        api_key,
        language,
        include_image_language: imageLanguage,
        sort_by: 'popularity.desc',
        page: this.popularPage,
        'primary_release_date.gte': startDate,
        'primary_release_date.lte': endDate,
      },
    });
  }

  public buildDateInterval(): {
    startDate: string;
    endDate: string;
  } {
    const today = new Date();
    const todayInAMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    let monthString;

    const month = today.getMonth();

    if (month < 10) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const startDate = `${today.getFullYear()}-${monthString}-01`;
    const endDate = `${today.getFullYear()}-${monthString}-${todayInAMonth}`;

    return {
      startDate,
      endDate,
    };
  }

  public getMovieDetail(
    movieId: number,
    language: string = 'es',
    imageLanguage: string = 'es'
  ) {
    const { startDate, endDate } = this.buildDateInterval();

    return this.http.get<DetailMovie>(`${url}/movie/${movieId}`, {
      params: {
        api_key,
        language,
        include_image_language: imageLanguage,
        sort_by: 'popularity.desc',
        page: this.popularPage,
        'primary_release_date.gte': startDate,
        'primary_release_date.lte': endDate,
      },
    });
  }

  public getActorsMovie(
    movieId: number,
    language: string = 'es',
    imageLanguage: string = 'es'
  ) {
    const { startDate, endDate } = this.buildDateInterval();

    return this.http.get<CreditsMovie>(`${url}/movie/${movieId}/credits`, {
      params: {
        api_key,
        language,
        include_image_language: imageLanguage,
        sort_by: 'popularity.desc',
        page: this.popularPage,
        'primary_release_date.gte': startDate,
        'primary_release_date.lte': endDate,
      },
    });
  }

  public searchMovie(
    query: string,
    language: string = 'es',
    imageLanguage: string = 'es'
  ) {
    const { startDate, endDate } = this.buildDateInterval();

    return this.http.get<SearchMovie>(`${url}/search/movie`, {
      params: {
        query,
        api_key,
        language,
        include_image_language: imageLanguage,
        sort_by: 'popularity.desc',
        'primary_release_date.gte': startDate,
        'primary_release_date.lte': endDate,
      },
    });
  }
}
