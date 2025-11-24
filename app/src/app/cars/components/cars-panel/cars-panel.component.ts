import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from "src/app/shared/components/side-bar/side-bar.component";
import { NewCarComponent } from "../new-car/new-car.component";
import { CarsListComponent } from "../cars-list/cars-list.component";

@Component({
  selector: 'app-cars-panel',
  templateUrl: './cars-panel.component.html',
  styleUrls: ['./cars-panel.component.scss'],
  imports: [SideBarComponent, NewCarComponent, CarsListComponent],
})
export class CarsPanelComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
