import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MovieResult } from '../interfaces';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../components/detail/detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public textValue: string = '';
  public movies: MovieResult[] = [];
  public moviesLoading: boolean = false;
  public ideas: string[] = ['Spiderman', 'Superman', 'Avenger'];

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  public onSearchChange(event: Event) {
    const newEvent = event as CustomEvent;
    this.onSearchMovie(newEvent.detail.value);
  }

  public onSearchMovie(value: string) {
    if (value.trim().length === 0) {
      this.movies = [];
      return;
    }

    this.moviesLoading = true;
    this.moviesService.searchMovie(value).subscribe(({ results }) => {
      this.movies = results;
      setTimeout(() => {
        this.moviesLoading = false;
      }, 500);
    });
  }

  public onSetIdea(value: string) {
    this.textValue = value;
    this.onSearchMovie(this.textValue);
  }

  public async onViewDetail(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id,
      },
    });

    modal.present();
  }
}
