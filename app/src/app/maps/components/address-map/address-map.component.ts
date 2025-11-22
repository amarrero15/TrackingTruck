import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MapService } from 'src/app/services/map';
import { PlacesService } from 'src/app/services/places';
import * as mapboxgl from 'mapbox-gl';
import { Map, Popup, Marker } from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.component.html',
  styleUrls: ['./address-map.component.scss'],
  standalone: true,                
  imports: [SearchBarComponent, MatDatepickerModule, MatFormFieldModule, CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
    providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AddressMapComponent  implements AfterViewInit {
  inputFecha!: HTMLInputElement; // Declaración tipada
  inputFecha2!: HTMLInputElement; // Declaración tipada

  startDate=new Date();
  finalDate=this.addDaysToFinalDate(this.startDate, 1);
  todayDate=new Date();
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  
  @ViewChild('mapDiv') mapDivElement!: ElementRef<HTMLDivElement>;

dateValueChange(value: Date | null) {
  if (!value) return;              // por si viene null

  this.startDate = value;
  this.finalDate = this.addDaysToFinalDate(this.startDate, 1);
}

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

    addDaysToFinalDate(date: Date, days: any){
    var res = new Date(date);
    res.setDate(res.getDate()+days);
    return res;
  }

  ngAfterViewInit(): void {
      this.inputFecha = document.getElementById('fecha') as HTMLInputElement;

      const hoy = new Date().toISOString().split("T")[0];
      this.inputFecha.min = hoy;

      this.inputFecha2 = document.getElementById('fecha2') as HTMLInputElement;

      //const hoy = new Date().toISOString().split("T")[0];
      this.inputFecha2.min = hoy;
    // Si ya tenemos la localización, inicializamos de una vez
    if (this.placesService.isUserLocationReady) {
      this.initMap(this.placesService.userLocation!);
      return;
    }

    // Si todavía no, la pedimos y luego montamos el mapa
    this.placesService.getUserLocation()
      .then(coords => {
        this.initMap(coords);

      })
      .catch(() => {
        // Aquí ya mostraste un alert en el servicio; opcionalmente log o UI
        console.warn('No se pudo obtener la geolocalización del usuario');
      });
  }

private initMap(center: [number, number]): void {
  const map = new Map({
    container: this.mapDivElement.nativeElement,
    style: 'mapbox://styles/amarrero15/cmi9aoik0001v01ry470odpr5',
    center,
    zoom: 14,
    accessToken: environment.mapboxToken,
  });

  this.mapService.setMap(map);

  // Punto de inicio = ubicación del usuario
  this.mapService.setStart(center);
}
/*
    const popup = new Popup().setHTML(`
      <h6>Aquí estoy</h6>
      <span>Estoy en este lugar del mundo</span>
    `);
*/
/*
    new Marker({ color: '#4178BF', draggable: true })
      .setLngLat(center)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map);*/
      //this.mapService.setMap(map);
      // Pin inicial en la ubicación del usuario
      // this.mapService.addMarker(center);


}
