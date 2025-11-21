import { Injectable } from '@angular/core';
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlacesApiClent } from '../api/placesApiClient';
@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public userLocation?:[number, number];

  // ⬇️ NUEVO: dos listas separadas
  public originPlaces: Feature[] = [];
  public destinationPlaces: Feature[] = [];

  // ⬇️ NUEVO: dos flags de loading
  public isLoadingOrigin: boolean = false;
  public isLoadingDestination: boolean = false;

  //public isLoadingPlaces:boolean=false;
  //public places:Feature[]=[]
  get isUserLocationReady():boolean{
    return !!this.userLocation;
  }
  constructor(private placesApi: PlacesApiClent) { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalización');
          console.log(err);
          reject();
        }
      );
    });
  }

  // ⬇️ IMPORTANTE: ahora recibe el tipo: 'origin' | 'destination'
  getPlacesByQuery(query: string = '', type: 'origin' | 'destination' = 'origin') {
    const isOrigin = type === 'origin';

    if (query.length === 0) {
      if (isOrigin) {
        this.originPlaces = [];
        this.isLoadingOrigin = false;
      } else {
        this.destinationPlaces = [];
        this.isLoadingDestination = false;
      }
      return;
    }

    if (!this.userLocation) throw Error('No hay localizacion del usuario');

    if (isOrigin) {
      this.isLoadingOrigin = true;
    } else {
      this.isLoadingDestination = true;
    }

    this.placesApi
      .get<PlacesResponse>(`/${query}.json?`, {
        params: {
          proximity: this.userLocation.join(','),
        },
      })
      .subscribe((res) => {
        console.log(res.features);

        if (isOrigin) {
          this.isLoadingOrigin = false;
          this.originPlaces = res.features;
        } else {
          this.isLoadingDestination = false;
          this.destinationPlaces = res.features;
        }
      });
  }
}
