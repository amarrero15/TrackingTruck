import { Injectable } from '@angular/core';
import { LngLatLike, Map, Marker, LngLatBounds } from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map?: Map;
  private markers?: Marker[]=[];

  // marcadores de inicio y fin
  private startMarker?: Marker;
  private endMarker?: Marker;

  // 🔹 NUEVO: posición actual y marcador del dispositivo
  public userLocation?: [number, number];
  private userMarker?: Marker;

  // rutas almacenadas
  public startLocation?: [number, number];
  public endLocation?: [number, number];

  get isMapReady(){
    return !!this.map;
  }
  constructor() { }

  setMap(map: Map){
    this.map=map;
  }

  flyTo(coords:LngLatLike){
    if(!this.isMapReady) throw Error('El mapa no está inicializado');

    this.map?.flyTo({
      zoom:14,
      center:coords
    })
  } 

  // 🔹 Establecer punto de inicio y guardar coordenadas
  setStart(coords: [number, number]) {
    if (!this.isMapReady) throw Error('El mapa no está inicializado');

    this.startLocation = coords;

    // si ya hay marcador de inicio, lo movemos
    if (this.startMarker) {
      this.startMarker.setLngLat(coords);
    } else {
      this.startMarker = new Marker({ color: '#22c55e', draggable: true }) // verde
        .setLngLat(coords)
        .addTo(this.map!);
    }

    // si ya tenemos fin también, dibujamos ruta
    if (this.startLocation && this.endLocation) {
      this.drawRoute(this.startLocation, this.endLocation);
    }
  }

  // 🔹 Establecer punto de llegada y guardar coordenadas
  setEnd(coords: [number, number]) {
    if (!this.isMapReady) throw Error('El mapa no está inicializado');

    this.endLocation = coords;

    if (this.endMarker) {
      this.endMarker.setLngLat(coords);
    } else {
      this.endMarker = new Marker({ color: '#ef4444', draggable: true }) // rojo
        .setLngLat(coords)
        .addTo(this.map!);
    }

    if (this.startLocation && this.endLocation) {
      this.drawRoute(this.startLocation, this.endLocation);
    }
  }

  // 🔹 Llamar a Mapbox Directions API y pintar la ruta
  private async drawRoute(
    start: [number, number],
    end: [number, number]
  ): Promise<void> {
    if (!this.isMapReady) throw Error('El mapa no está inicializado');

    const map = this.map!;

const url = `https://api.mapbox.com/directions/v5/mapbox/driving/` +
  `${start[0]},${start[1]};${end[0]},${end[1]}` +
  `?geometries=geojson&overview=full&access_token=${environment.mapboxToken}`;

    const resp = await fetch(url);
    const data = await resp.json();

    if (!data.routes || data.routes.length === 0) {
      console.warn('No se encontró ruta entre los dos puntos');
      return;
    }

    const routeCoords: [number, number][] = data.routes[0].geometry.coordinates;

    // eliminar ruta previa (si existiera)
    if (map.getLayer('route-line')) {
      map.removeLayer('route-line');
    }
    if (map.getSource('route-line')) {
      map.removeSource('route-line');
    }

    // añadir nueva ruta
    map.addSource('route-line', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: routeCoords,
        },
        properties: {}, // 👈 obligatorio para el tipo Feature
      },
    });

    map.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route-line',
      paint: {
        'line-color': '#3b82f6',
        'line-width': 5,
      },
    });

    // ajustar el mapa a la ruta
    const bounds = new LngLatBounds(routeCoords[0], routeCoords[0]);
    for (const coord of routeCoords) {
      bounds.extend(coord);
    }
    map.fitBounds(bounds, { padding: 50 });
  }

  // NUEVO: crear o mover el pin en la posición indicada
  addMarker(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('El mapa no está inicializado');

    // eliminar markers anteriores para que solo haya uno
    this.markers?.forEach(marker => marker.remove());
    this.markers = [];

    const marker = new Marker({ color: '#4178BF', draggable: true })
      .setLngLat(coords)
      .addTo(this.map!);

    this.markers.push(marker);
  }
}
