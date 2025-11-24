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
import { RoutesService } from 'src/app/services/routes';
@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss'],
  standalone:true,
  imports:[MatIconModule, MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatFormFieldModule, CommonModule]
})
export class RoutesListComponent  implements OnInit {
  displayedColumns: string[] = ['Conductor', 'Inicio', 'Final', 'Origen', 'Destino', 'Vehiculo','edit', 'delete'];
  //dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  routes:any;
  constructor(private exportService: ExportService, private routesService: RoutesService) {
    this.getRoutes();
   }


   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRoutes(element:any, index:any){
    this.routesService.deleteRoute(element.routeId).subscribe(res=>{
      //alert('Institución eliminada del sistema')
      this.routes.splice(this.routes.indexOf(element),1);
      this.dataSource = new MatTableDataSource(this.routes);
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

  ngOnInit() {}

  getRoutes():void{
    /*
    this.routesService.getRoutes().subscribe(res => 
      this.routes = res.data 
    );*/
  }

    exportToXLS(){
      let datos=[{
        conductor:'Eduardo Vargas Rosales'
        ,Origen:''
        ,Destino:''
      }]
      this.exportService.exportToExcel(datos, 'usuarios.xlsx');
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
