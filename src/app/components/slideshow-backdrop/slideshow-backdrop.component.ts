import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

import { Movie } from 'src/app/interfaces';
import { DetailComponent } from '../detail/detail.component';

register();

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent {
  @Input() recentMovies: Movie[] = [];

  constructor(private modalCtrl: ModalController) {}

  public async onViewDetailMove(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id,
      },
    });

    modal.present();
  }
}
