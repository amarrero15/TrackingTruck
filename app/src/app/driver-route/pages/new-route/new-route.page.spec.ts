import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewRoutePage } from './new-route.page';

describe('NewRoutePage', () => {
  let component: NewRoutePage;
  let fixture: ComponentFixture<NewRoutePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
