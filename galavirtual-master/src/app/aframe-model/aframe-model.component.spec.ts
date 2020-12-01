import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AframeModelComponent } from './aframe-model.component';

describe('AframeModelComponent', () => {
  let component: AframeModelComponent;
  let fixture: ComponentFixture<AframeModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AframeModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AframeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
