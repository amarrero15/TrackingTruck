import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { SideBarService } from 'src/app/services/side-bar';
import { Router } from '@angular/router';
import { CarsOptions, driversOptions, RoutesOptions } from '../../enumerations/options.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone:true,
  imports:[MatExpansionModule, CommonModule, FormsModule]
})
export class SideBarComponent  implements OnInit {

  constructor(
    private router: Router,    
    private sideBarService: SideBarService,
    //private authService: AuthService,
    //private notification: MatSnackBar,
    //private errorCodesService: ErrorCodesService
  ){}


  //@Output() sideBarEvent= new EventEmitter();
  panelOpenState = false;
  sideBarSections = [
    {icon:'driver',title: 'Conductores', options: [
      {name: 'Panel Conductores', event: driversOptions.VIEW.toString()},
      //{name: 'Lista de profesores', event: professorOptions.LIST.toString()}
    ]},
    {icon:'car',title: 'Vehículos', options: [
      {name: 'Panel Vehiculos', event: CarsOptions.VIEW.toString()},
      //{name: 'Lista de estudiantes', event: studentOptions.LIST.toString()}
    ]},
    {icon:'routes',title: 'Rutas', options: [
      {name: 'Generar Ruta', event: RoutesOptions.ADD.toString()},
      {name: 'Lista de Rutas', event: RoutesOptions.LIST.toString()}
    ]},
    /*{title: 'Notificaciones', options: [
      {name: 'Crear mensaje', event: notificationOptions.CREATE.toString()},
      {name: 'Lista de mensajes', event: notificationOptions.LIST.toString()}
    ]}*/
  ];    
  //userInfo: any;
  //private notificationSuccessMSG = `Cierre de sesión exitoso`;
  //private notificationActionMSG = $localize `:@@closeNotificationTxt:Cerrar`;  


  ngOnInit(){
    //this.userInfo = this.authService.getInstitution();
  }

  openForm(value: any){        
    let route;
    const section = this.sideBarSections.find((section) => 
      section.options.find((elem) => elem.event === value));
    switch(section?.title) {
      case this.sideBarSections[0].title: 
        route = 'conductores';
        break;

      case this.sideBarSections[1].title: 
        route = 'vehiculos';
        break; 
      
      case this.sideBarSections[2].title: 
        route = 'rutas';
        break; 
      
      case this.sideBarSections[3].title: 
        route = 'usuarios';
        break; 
      
      case this.sideBarSections[4].title: 
        route = 'notificaciones';
        break;        

      default:
        route = 'dashboard';
        break;     
   }
   this.sideBarService.navigateNextSection(route, value);
  }

  logout(){
    /*
    this.authService.logout1()
      .then(() => this.notification.open(this.notificationSuccessMSG, '', { duration: 3*1000, verticalPosition: 'top', panelClass: 'success-snackbar-container'}))    
      .catch((err) => this.notification.open(this.errorCodesService.getErrorMessage(err.error.message?.split('**')[0]), this.notificationActionMSG, {verticalPosition: 'top', panelClass: 'error-snackbar-container'}))
      .finally(() => this.router.navigate(['autenticacion']));*/
  }

}
