import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CarsService {
  API_URI = environment.TAPI;
  constructor(private http:HttpClient) { }

  addCar(carData:any){
    return this.http.post(`${this.API_URI}/vehiculos`, carData)
  }

  getCars(): Observable<any> {
    return this.http.get(`${this.API_URI}/vehiculos`);
  }
  updateCars(){
    
  }

  deleteCars(driverId:any){
    return this.http.delete(`${this.API_URI}/vehiculos/${driverId}`)
  } 
}
