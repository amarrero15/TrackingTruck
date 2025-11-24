import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  // Subject is like EventEmitter, extends Observable
  private _nextSection: Subject<any> = new Subject();

  constructor(private router: Router){}

  // getter to subscribe on pages
  get nextSection(): Observable<any>{
    return this._nextSection;
  }  

  // every click "emit" the value to active page
  navigateNextSection(route: any, value: any){
    this.router.navigate([route])
      .then(() => this._nextSection.next(value));
  } 
}
