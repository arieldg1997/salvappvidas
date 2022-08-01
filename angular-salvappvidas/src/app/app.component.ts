import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'angular-salvappvidas';
  private root = document.documentElement;
  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    const e = localStorage.getItem('fontSize');
    if (e != null) {
      this.root.style.setProperty('--font-size', e + 'rem');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
