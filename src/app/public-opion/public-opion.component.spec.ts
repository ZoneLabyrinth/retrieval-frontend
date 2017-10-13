import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicOpionComponent } from './public-opion.component';

describe('PublicOpionComponent', () => {
  let component: PublicOpionComponent;
  let fixture: ComponentFixture<PublicOpionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicOpionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicOpionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
