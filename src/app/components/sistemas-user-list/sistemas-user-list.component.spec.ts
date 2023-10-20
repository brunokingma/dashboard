import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemasUserListComponent } from './sistemas-user-list.component';

describe('SistemasComponent', () => {
  let component: SistemasUserListComponent;
  let fixture: ComponentFixture<SistemasUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemasUserListComponent]
    });
    fixture = TestBed.createComponent(SistemasUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
