import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriversService } from 'src/app/services/drivers';
@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.component.html',
  styleUrls: ['./new-driver.component.scss'],
  standalone:true,
  imports:[CommonModule, FormsModule]
})
export class NewDriverComponent  implements OnInit {
  driverData={
    name:''
    ,lastName:''
    ,email:''
    ,phoneNumber:''

  }
  constructor(private driversService: DriversService) { }

  ngOnInit() {}

  addDriver(){
    this.driversService.addDriver(this.driverData).subscribe(res=>{
      alert('Conductor Agregado al sistema')
      window.location.reload();
    })
  }

}
