import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DriversService {
  API_URI = environment.TAPI;
  constructor(private http:HttpClient) { }

  addDriver(driverData:any){
    return this.http.post(`${this.API_URI}/conductores`, driverData)
  }

  getDrivers(): Observable<any> {
    return this.http.get(`${this.API_URI}/conductores`);
  }
  updateRoutes(){
    
  }

  deleteDriver(driverId:any){
    return this.http.delete(`${this.API_URI}/conductores/${driverId}`)
  }
}
