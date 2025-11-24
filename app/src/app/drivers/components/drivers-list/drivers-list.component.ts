import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog,} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ExportService } from 'src/app/services/export';
import { DriversService } from 'src/app/services/drivers';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss'],
  standalone:true,
  imports:[MatIconModule, MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatFormFieldModule, CommonModule, FormsModule]
})
export class DriversListComponent  implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Apellido', 'Email', 'Telefono', 'Estado','edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  drivers:any;
  constructor(private driverService: DriversService, private exportService: ExportService) {
    this.getDrivers();

    /*this.driverService.getDrivers().subscribe(res=>{       
      res.data.forEach((elem: any) => {
        elem.name = elem.name;
        elem.lastName = elem.lastName;
        elem.email = elem.email;
        elem.phoneNumber = elem.phoneNumber;
  
      });
      this.drivers = res.data;
      this.dataSource = new MatTableDataSource(this.drivers);
      //console.log(this.institutions);
    })*/
   }

  ngOnInit() {}

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRoutes(element:any, index:any){
    this.driverService.deleteDriver(element.driverId).subscribe(res=>{
      //alert('Institución eliminada del sistema')
      this.drivers.splice(this.drivers.indexOf(element),1);
      this.dataSource = new MatTableDataSource(this.drivers);
    })
  }

  editRoutes(element:any): void {
    /*
    const dialogRef = this.dialog.open(EditInstitutionComponent, {
      panelClass:'edit-institution-container',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
    });*/
  }



  getDrivers(): void {
    this.driverService.getDrivers().subscribe({
      next: (res: any) => {
        // Si tu API devuelve { data: [...] }, descomenta la siguiente línea:
        // const data = res.data;

        // Si tu API devuelve directamente un array, usa:
        const data = Array.isArray(res) ? res : res?.data;

        if (!Array.isArray(data)) {
          console.error('Respuesta inesperada de getDrivers:', res);
          return;
        }

        this.drivers = data;
        this.dataSource = new MatTableDataSource(this.drivers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error en getDrivers:', err);
      }
    });
  }

    exportToXLS(){
      var newData:any=[];
      for (let i = 0; i < this.drivers.length; i++) {
      let data={
        "Nombre":this.drivers[i].name,
        "Apellido":this.drivers[i].lastName,
        "Email":this.drivers[i].email,
        "Teléfono":this.drivers[i].phoneNumber,
      }
      newData.push(data);
      console.log ("Block statement execution no." + i);
    }

      this.exportService.exportToExcel(newData, 'conductores.xlsx');
    /*
    var newData:any=[]
    for (let i = 0; i < this.routes.length; i++) {
      let data={
        "Coductor":this.routes[i].driver,
        "Inicio":this.routes[i].start,
        "Final":this.routes[i].final,
        "Origen":this.routes[i].origin,
        "Destino":this.routes[i].destiny,
        "Vehículo":this.routes[i].car,
      }
      newData.push(data);
      console.log ("Block statement execution no." + i);
    }
    this.exportService.convertToXlsxCsv(newData, 'estudiantes.xlsx', 'xlsx')*/

  }

}
