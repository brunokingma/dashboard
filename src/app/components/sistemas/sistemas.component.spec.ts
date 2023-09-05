import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemasComponent } from './sistemas.component';

describe('SistemasComponent', () => {
  let component: SistemasComponent;
  let fixture: ComponentFixture<SistemasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemasComponent]
    });
    fixture = TestBed.createComponent(SistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
