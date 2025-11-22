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
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  routes:any;
  constructor(private exportService: ExportService, private routesService: RoutesService) {
    
   }

  ngOnInit() {}

  getRoutes():void{
    this.routesService.getRoutes().subscribe(res => 
      this.routes = res.data
    );
  }
}
