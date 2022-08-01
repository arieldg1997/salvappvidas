import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { interval } from 'rxjs';

interface CentroDeDonacion {
  nombre: string;
  descripcion: string;
  center: [number, number];
  marker?: mapboxgl.Marker;
}

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css'],
})
export class DonationsComponent implements OnInit, OnDestroy {
  @ViewChild('mapa2') divMapa!: ElementRef;
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

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    mail: [
      ,
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    telefono: [, [Validators.required, Validators.min(1000000)]],
    donacion: [, [Validators.required]],
    centro: [, [Validators.required]],
  });
  donacionExitosa: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

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

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    this.donacionExitosa = true;
    interval(3000).subscribe((x) => {
      this.donacionExitosa = false;
    });
    this.miFormulario.reset();
  }

  onChange(deviceValue: any) {
    this.mapa.flyTo({
      center: [
        deviceValue.value.split(',')[0],
        deviceValue.value.split(',')[1],
      ],
    });
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
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
