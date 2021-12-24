import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbAuthComponent } from './navb-auth.component';

describe('NavbarComponent', () => {
  let component: NavbAuthComponent;
  let fixture: ComponentFixture<NavbAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
