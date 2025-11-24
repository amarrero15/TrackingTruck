import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from "src/app/shared/components/side-bar/side-bar.component";
import { AddressMapComponent } from "src/app/maps/components/address-map/address-map.component";
import { RouteHomeCardComponent } from "src/app/driver-route/components/route-home-card/route-home-card.component";

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.scss'],
  imports: [SideBarComponent, AddressMapComponent, RouteHomeCardComponent],
})
export class HomePanelComponent  implements OnInit {
  services=[
    {
      title:'Rutas asignadas'
      ,description:'Revisa tus rutas asignadas de manera sencilla.'
      ,image:"assets/icon/route.svg"
      ,action:'driver-routes'
   }
    ,{
      title:'Reportar Avería'
      ,description:'Reporta fallas en tu unidad'
      ,image:"assets/icon/car.svg"
      ,action:'dnf'
   }
  ]
  constructor() { }

  ngOnInit() {}

}
