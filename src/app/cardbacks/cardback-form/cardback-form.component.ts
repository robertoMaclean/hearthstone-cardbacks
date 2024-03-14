import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Cardback } from '../carback';
import { CardbacksService } from '../cardbacks.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cardback-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './cardback-form.component.html',
  styleUrl: './cardback-form.component.scss',
})
export class CardbackFormComponent {
  @Input()
  cardback: Cardback | null = null;
  @Output() refreshCardbackEvent = new EventEmitter<void>();
  @Output() cleanNewEvent = new EventEmitter<void>();
  public urlRegex =
    /(^|\s)((http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))?)/gi;
  cardbackForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(220),
    ]),
    howToGet: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(130),
    ]),
    img: new FormControl('', [
      Validators.required,
      Validators.maxLength(200),
      Validators.pattern(this.urlRegex),
    ]),
  });

  constructor(private cardbackService: CardbacksService) {}

  ngOnInit() {
    if (this.cardback) {
      console.log('in set cardback', this.cardback);
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
