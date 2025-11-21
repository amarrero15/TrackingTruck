import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from "src/app/shared/components/side-bar/side-bar.component";
import { AddressMapComponent } from "src/app/maps/components/address-map/address-map.component";

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.scss'],
  imports: [SideBarComponent, AddressMapComponent],
})
export class HomePanelComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
