import { Component, OnInit, Input } from '@angular/core';
import { SearchResultsComponent } from "../search-results/search-results.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlacesService } from 'src/app/services/places';
import { Feature } from 'src/app/interfaces/places';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [SearchResultsComponent, CommonModule, FormsModule],
})
export class SearchBarComponent implements OnInit {
  @Input() type: 'origin' | 'destination' = 'origin';

  myPlaceValue = '';
  private debounceTimer?: any;

    // para mostrar/ocultar el listado
  showResults = false;

  constructor(private placesService: PlacesService) { }

  ngOnInit(): void {}

  // placeholder dinámico según sea salida o llegada
  get placeholder(): string {
    return this.type === 'origin'
      ? 'Lugar de salida...'
      : 'Lugar de llegada...';
  }

  onQueryChanged() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      // llamamos al servicio indicando si es origen o destino
      this.placesService.getPlacesByQuery(this.myPlaceValue, this.type);
      // solo mostramos la lista si hay texto
      this.showResults = this.myPlaceValue.length > 0;
    }, 350);
  }

  // ⬇️ se llama cuando el usuario selecciona un lugar en la lista
  onPlaceSelected(place: Feature) {
    // dejamos el nombre en el input
    this.myPlaceValue = place.place_name;
    // cerramos el componente de resultados
    this.showResults = false;
  }
}
