import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarConfigComponent } from './navbar-config.component';

describe('NavbarConfigComponent', () => {
  let component: NavbarConfigComponent;
  let fixture: ComponentFixture<NavbarConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
