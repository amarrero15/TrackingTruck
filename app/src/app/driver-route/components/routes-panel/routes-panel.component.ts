import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from "src/app/shared/components/side-bar/side-bar.component";
import { RoutesListComponent } from "../routes-list/routes-list.component";
import { RoutesOptions } from 'src/app/shared/enumerations/options.enum';
import { AddressMapComponent } from "src/app/maps/components/address-map/address-map.component";
import { SideBarService } from 'src/app/services/side-bar';
@Component({
  selector: 'app-routes-panel',
  templateUrl: './routes-panel.component.html',
  styleUrls: ['./routes-panel.component.scss'],
  imports: [SideBarComponent, RoutesListComponent, AddressMapComponent],
})
export class RoutesPanelComponent  implements OnInit {
  sectionName='Agregar Ruta'
  visibleForm: any;
  routesOptions=RoutesOptions;
  constructor(private sideBarService: SideBarService) { 
    this.sideBarService.nextSection.subscribe(value => this.openForm(value));
  }

  ngOnInit() {}

  openForm(event: any){    
    switch(event) { 
      case RoutesOptions.ADD: { 
        this.sectionName = 'Agregar Ruta';
        this.visibleForm = event;
        break; 
      } 
      case RoutesOptions.LIST: { 
        this.sectionName = 'Lista de Rutas';
        this.visibleForm = event;
        break; 
      }
      // professorOptions.LIST
      default: { 
        this.sectionName = 'Lista de Rutas';
        this.visibleForm = event;
        break; 
      } 
   } 
  }

}
