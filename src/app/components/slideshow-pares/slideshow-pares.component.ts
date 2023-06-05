import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { register } from 'swiper/element/bundle';
import { Movie } from 'src/app/interfaces';

register();
@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() movies: Movie[] = [];
  @Output() loadMore = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public onLoadMore() {
    this.loadMore.emit();
  }
}
