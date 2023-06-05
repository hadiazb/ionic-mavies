import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public recentMovies: Movie[] = [];
  public popular: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getRecentMovies();
    this.getPopular();
  }

  public loadMore() {
    this.getPopular();
  }

  public getPopular() {
    this.moviesService.getPopular().subscribe(({ results }) => {
      this.popular = [...this.popular, ...results];
    });
  }

  public getRecentMovies() {
    this.moviesService.getFeature().subscribe(({ results }) => {
      this.recentMovies = results;
    });
  }
}
