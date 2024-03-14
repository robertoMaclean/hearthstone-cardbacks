import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardbackFormComponent } from './cardback-form.component';

describe('CardbackFormComponent', () => {
  let component: CardbackFormComponent;
  let fixture: ComponentFixture<CardbackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardbackFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
