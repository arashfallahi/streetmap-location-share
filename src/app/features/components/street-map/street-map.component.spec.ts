import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetMapComponent } from './street-map.component';

describe('StreetMapComponent', () => {
  let component: StreetMapComponent;
  let fixture: ComponentFixture<StreetMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreetMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreetMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
