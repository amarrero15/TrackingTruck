import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Feature } from 'src/app/interfaces/places';
import { PlacesService } from 'src/app/services/places';
import { MapService } from 'src/app/services/map';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  standalone: true,   
  imports:[CommonModule, FormsModule]
})
export class SearchResultsComponent  implements OnInit {
  @Input() type: 'origin' | 'destination' = 'origin';  
  @Output() resultEvent = new EventEmitter<Feature>(); 
  public selectedId: string = '';
  placesList: any;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {}
  
  // ⬇️ NECESARIO (ESTE GETTER ES EL QUE FALTABA)
  get isLoadingPlaces() {
    return this.type === 'origin'
      ? this.placesService.isLoadingOrigin
      : this.placesService.isLoadingDestination;
  }

  get places() {
    return this.type === 'origin'
      ? this.placesService.originPlaces
      : this.placesService.destinationPlaces;
  }

  // click en un resultado
  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    const coords: [number, number] = [lng, lat];

    // si es origen, marcamos inicio; si es destino, marcamos llegada
    if (this.type === 'origin') {
      this.mapService.setStart(coords);
    } else {
      this.mapService.setEnd(coords);
    }

    this.mapService.flyTo(coords);

        // 👇 enviamos el lugar al padre (SearchBarComponent)
    this.resultEvent.emit(place);

  }

  // 🔹 Establecer como punto de inicio
  setStart(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    const coords: [number, number] = [lng, lat];

    this.mapService.setStart(coords);
    this.mapService.flyTo(coords);
  }

  // 🔹 Establecer como punto de llegada
  setEnd(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    const coords: [number, number] = [lng, lat];

    this.mapService.setEnd(coords);
    this.mapService.flyTo(coords);
  }

}
