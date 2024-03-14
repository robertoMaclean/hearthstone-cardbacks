import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardbacksComponent } from './cardbacks.component';

describe('CardbacksComponent', () => {
  let component: CardbacksComponent;
  let fixture: ComponentFixture<CardbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardbacksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
