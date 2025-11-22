import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  API_URI = environment.TAPI;
  constructor(private http:HttpClient) { }

  addRoute(routeData:any){
    return this.http.post(`${this.API_URI}/rutas`, routeData)
  }

  getRoutes(){
    return this.http.get(`${this.API_URI}/rutas`);
  }
  updateRoutes(){
    
  }

  deleteRoute(routeId:any){
    return this.http.delete(`${this.API_URI}/rutas/${routeId}`)
  }
}
