import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Cardback } from '../carback';
import { CardbacksService } from '../cardbacks.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cardback-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './cardback-form.component.html',
  styleUrl: './cardback-form.component.scss',
})
export class CardbackFormComponent {
  @Input()
  cardback: Cardback | null = null;
  @Output() refreshCardbackEvent = new EventEmitter<void>();
  @Output() cleanNewEvent = new EventEmitter<void>();
  cardbackForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    howToGet: new FormControl(''),
    img: new FormControl(''),
  });

  constructor(private cardbackService: CardbacksService) {}

  ngOnInit() {
    if (this.cardback) {
      this.setCardbackForm(this.cardback);
    }
  }

  setCardbackForm(carback: Cardback): void {
    this.cardbackForm.controls['name'].setValue(carback.name);
    this.cardbackForm.controls['howToGet'].setValue(carback.howToGet);
    this.cardbackForm.controls['description'].setValue(carback.description);
    this.cardbackForm.controls['img'].setValue(carback.img);
  }

  onUpdateSubmit(carback: Cardback | null) {
    if (this.cardbackForm.valid) {
      const updatedCarback: Cardback = {
        cardBackId: carback ? carback.cardBackId : this.getNewCardBackId(),
        img: this.cardbackForm.value.img ?? '',
        name: this.cardbackForm.value.name ?? '',
        howToGet: this.cardbackForm.value.howToGet ?? '',
        description: this.cardbackForm.value.description ?? '',
        isEdit: false,
      };
      if (!carback) {
        this.cardbackService.addCardback(updatedCarback);
        this.cleanNewEvent.emit();
      } else {
        this.cardbackService.updateCardback(updatedCarback);
      }
      this.refreshCardbackEvent.emit();
    }
  }

  getNewCardBackId(): number {
    const cardbacks = this.cardbackService.getCardbacksFromLocalStorage();
    const carbackIds = cardbacks.map((cardback) => cardback.cardBackId);
    return Math.max(...carbackIds) + 1;
  }
}
