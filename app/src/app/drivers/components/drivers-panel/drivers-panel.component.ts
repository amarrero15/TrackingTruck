import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from "src/app/shared/components/side-bar/side-bar.component";
import { NewDriverComponent } from "../new-driver/new-driver.component";
import { DriversListComponent } from "../drivers-list/drivers-list.component";

@Component({
  selector: 'app-drivers-panel',
  templateUrl: './drivers-panel.component.html',
  styleUrls: ['./drivers-panel.component.scss'],
  imports: [SideBarComponent, NewDriverComponent, DriversListComponent],
})
export class DriversPanelComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
