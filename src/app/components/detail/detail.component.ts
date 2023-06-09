import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CreditsMovie, DetailMovie } from 'src/app/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() id?: number;
  public movieDetail?: DetailMovie;
  public creditsMovie?: CreditsMovie;
  public textLength: number = 150;
  public isFavorite: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private localDataService: StorageService
  ) {}

  async ngOnInit() {
    this.getMovie();
    this.getActors();
    await this.existFavorite();
  }

  public getMovie() {
    if (!this.id) {
      return;
    }
    this.moviesService.getMovieDetail(this.id).subscribe((detailMovie) => {
      this.movieDetail = detailMovie;
    });
  }

  public getActors() {
    if (!this.id) {
      return;
    }
    this.moviesService.getActorsMovie(this.id).subscribe((actorsMovie) => {
      this.creditsMovie = actorsMovie;
    });
  }

  public onHideOrShowText() {
    if (this.textLength === 150) {
      this.textLength = 5000;
      return;
    }
    this.textLength = 150;
  }

  public onBack() {
    this.modalCtrl.dismiss();
  }

  public async onAddFavorite() {
    if (!this.movieDetail) {
      return;
    }
    const actionResp = this.localDataService.saveMovie(this.movieDetail);

    if (!actionResp) {
      this.isFavorite = false;
      return;
    }
    this.isFavorite = actionResp.isAdd;
  }

  public async existFavorite() {
    if (!this.id) {
      return;
    }
    const exist = await this.localDataService.isFavorite(this.id);
    this.isFavorite = exist;
  }
}
