import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCalcsComponent } from './config-calcs.component';

describe('ConfigCalcsComponent', () => {
  let component: ConfigCalcsComponent;
  let fixture: ComponentFixture<ConfigCalcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigCalcsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigCalcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
