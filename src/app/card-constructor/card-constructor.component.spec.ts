import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConstructorComponent } from './card-constructor.component';

describe('CardConstructorComponent', () => {
  let component: CardConstructorComponent;
  let fixture: ComponentFixture<CardConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardConstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
