import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

import { DetailMovie } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  public _movies: DetailMovie[] = [];
  public favorites: DetailMovie[] = [];
  public message: string = '';

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom' = 'top'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  public saveMovie(movie: DetailMovie) {
    let isAdd = false;
    if (!this._storage) {
      return;
    }

    const exists = this._movies.find((localMovie) => {
      return localMovie.id === movie.id;
    });

    if (exists) {
      this._movies = this._movies.filter(({ id }) => id !== movie.id);
      this.message = 'Se elimino de favoritos';
      isAdd = false;
    } else {
      this._movies = [movie, ...this._movies];
      this.message = 'Se agrego a favoritos';
      isAdd = true;
    }

    this._storage.set('movies', this._movies);
    this.presentToast(this.message);
    return {
      isAdd,
    };
  }

  public async loadFavorites() {
    if (!this._storage) {
      return;
    }

    const favorites = await this._storage.get('movies');
    this.favorites = favorites || [];

    return this.favorites;
  }

  public async isFavorite(movieId: number) {
    await this.loadFavorites();
    const exist = this.favorites.find(({ id }) => id === movieId);
    return exist ? true : false;
  }
}
