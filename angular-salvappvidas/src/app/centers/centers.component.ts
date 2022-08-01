import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface CentroDeDonacion {
  nombre: string;
  descripcion: string;
  center: [number, number];
  marker?: mapboxgl.Marker;
}

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css'],
})
export class CentersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef;
  termino: string = '';
  mapa!: mapboxgl.Map;
  zoomLevel: number = 16;
  center: [number, number] = [-57.962955, -34.926842];
  public centros: CentroDeDonacion[] = [
    {
      nombre: 'Plaza San Martín',
      descripcion: 'Centro de recolección de donaciones de la plaza San Martín',
      center: [-57.949393, -34.914984],
    },
    {
      nombre: 'Plaza Islas Malvinas',
      descripcion:
        'Centro de recolección de donaciones de la plaza Islas Malvinas',
      center: [-57.96168, -34.927627],
    },
    {
      nombre: 'Museo de La Plata',
      descripcion: 'Centro de recolección de donaciones del Museo de La Plata',
      center: [-57.935465, -34.909],
    },
  ];
  public centrosAMostrar: CentroDeDonacion[] = this.centros;
  debouncer: Subject<string> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(300)).subscribe((valor) => {
      console.log(valor);
      this.centrosAMostrar = this.centros.filter((x) =>
        x.descripcion.includes(valor)
      );
    });
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-57.962955, -34.926842],
      zoom: this.zoomLevel,
    });

    this.centros.forEach((c) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([c.center[0], c.center[1]])
        .addTo(this.mapa);
      c.marker = marker;
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move', (ev) => {
      this.center = [ev.target.getCenter().lng, this.mapa.getCenter().lat];
    });
  }

  irMarcador(marker: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marker.getLngLat(),
    });
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomCambio(valor: string) {
    this.mapa.zoomTo(Number(valor));
  }
}
