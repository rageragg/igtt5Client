import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbHomeComponent } from './navb-home.component';

describe('NavbHomeComponent', () => {
  let component: NavbHomeComponent;
  let fixture: ComponentFixture<NavbHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
