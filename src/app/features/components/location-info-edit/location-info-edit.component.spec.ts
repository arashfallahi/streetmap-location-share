import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInfoEditComponent } from './location-info-edit.component';

describe('LocationInfoEditComponent', () => {
  let component: LocationInfoEditComponent;
  let fixture: ComponentFixture<LocationInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationInfoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
