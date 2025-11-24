import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarsService } from 'src/app/services/cars';
@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.scss'],
  standalone:true,
  imports:[CommonModule, FormsModule]
})
export class NewCarComponent  implements OnInit {
  carData={
    brand:''
    ,model:''
    ,numberPlate:''
    ,capacity:''

  }
  constructor(private carsService:CarsService) { }

  ngOnInit() {}

  addCar(){
    this.carsService.addCar(this.carData).subscribe(res=>{
      alert('Vehiculo ggregado al sistema')
      window.location.reload();
    })
  }

}
