import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AddressMapComponent } from "src/app/maps/components/address-map/address-map.component";

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.page.html',
  styleUrls: ['./new-route.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AddressMapComponent]
})
export class NewRoutePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
