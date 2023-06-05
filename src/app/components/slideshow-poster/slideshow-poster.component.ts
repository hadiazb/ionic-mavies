import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces';

import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  @Input() movies: Movie[] = [];
  constructor() {}

  ngOnInit() {}
}
