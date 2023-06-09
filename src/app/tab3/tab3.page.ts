import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailMovie } from '../interfaces';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public favorites: DetailMovie[] = [];

  constructor(private storageService: StorageService) {}

  async ionViewWillEnter() {
    await this.loadFavorites();
  }

  public async loadFavorites() {
    const favorites = await this.storageService.loadFavorites();
    this.favorites = favorites || [];
  }
}
