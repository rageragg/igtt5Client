import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterlHomeComponent } from './footerl-home.component';

describe('FooterlHomeComponent', () => {
  let component: FooterlHomeComponent;
  let fixture: ComponentFixture<FooterlHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterlHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterlHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
