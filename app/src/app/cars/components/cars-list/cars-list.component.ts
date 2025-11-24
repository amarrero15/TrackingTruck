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
import { CarsService } from 'src/app/services/cars';
@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
  standalone:true,
  imports:[MatIconModule, MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatFormFieldModule, CommonModule]
})
export class CarsListComponent  implements OnInit {
  displayedColumns: string[] = ['Marca', 'Modelo', 'Placa/Matricula', 'Capacidad', 'Estado','edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cars:any;
  constructor(private carsService: CarsService, private exportService: ExportService) {
    this.getCars();
  }

 ngOnInit() {}

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCars(element:any, index:any){
    this.carsService.deleteCars(element.driverId).subscribe(res=>{
      //alert('Institución eliminada del sistema')
      this.cars.splice(this.cars.indexOf(element),1);
      this.dataSource = new MatTableDataSource(this.cars);
    })
  }

  editCars(element:any): void {
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



  getCars():void{
    this.carsService.getCars().subscribe({
      next: (res: any) => {
        // Si tu API devuelve { data: [...] }, descomenta la siguiente línea:
        // const data = res.data;

        // Si tu API devuelve directamente un array, usa:
        const data = Array.isArray(res) ? res : res?.data;

        if (!Array.isArray(data)) {
          console.error('Respuesta inesperada de getCars:', res);
          return;
        }

        this.cars = data;
        this.dataSource = new MatTableDataSource(this.cars);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error en getCars:', err);
      }
    });
  }

    exportToXLS(){
      var newData:any=[];
      for (let i = 0; i < this.cars.length; i++) {
      let data={
        "Marca":this.cars[i].brand,
        "Modelo":this.cars[i].model,
        "Matrícula":this.cars[i].numberPlate,
        "Capacidad":this.cars[i].capacity,
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
