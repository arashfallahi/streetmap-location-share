import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInfoDetailsComponent } from './location-info-details.component';

describe('LocationInfoDetailsComponent', () => {
  let component: LocationInfoDetailsComponent;
  let fixture: ComponentFixture<LocationInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationInfoDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
