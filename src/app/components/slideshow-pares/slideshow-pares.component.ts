import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

import { Movie } from 'src/app/interfaces';
import { DetailComponent } from '../detail/detail.component';

register();
@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() movies: Movie[] = [];
  @Output() loadMore = new EventEmitter();

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  public onLoadMore() {
    this.loadMore.emit();
  }

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
