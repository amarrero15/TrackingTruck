import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-route-home-card',
  templateUrl: './route-home-card.component.html',
  styleUrls: ['./route-home-card.component.scss'],
  imports: [MatCardModule, MatButtonModule,],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteHomeCardComponent  implements OnInit {
  @Input() serviceData={
    title:'Rutas asignadas'
    ,description:'Revisa tus rutas asignadas de manera sencilla.'
   ,image:"assets/icon/route.svg"
   ,action:'driver-routes'
  }
  constructor(private router: Router) { }

  ngOnInit() {}

    cta(){
    this.router.navigate([this.serviceData.action]);
  }

}
