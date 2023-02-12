import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetMapSimpleComponent } from './street-map-simple.component';

describe('StreetMapSimpleComponent', () => {
  let component: StreetMapSimpleComponent;
  let fixture: ComponentFixture<StreetMapSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreetMapSimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreetMapSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
