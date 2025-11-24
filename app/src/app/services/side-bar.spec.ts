import { TestBed } from '@angular/core/testing';

import { SideBar } from './side-bar';

describe('SideBar', () => {
  let service: SideBar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
