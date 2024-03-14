import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CardbacksService } from './cardbacks.service';
import { Cardback } from './carback';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { CardbackFormComponent } from './cardback-form/cardback-form.component';

@Component({
  selector: 'app-cardbacks',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    CardbackFormComponent,
  ],
  templateUrl: './cardbacks.component.html',
  styleUrl: './cardbacks.component.scss',
})
export class CardbacksComponent {
  cardbacks: Cardback[] = [];
  searchInput = '';
  createNew = false;
  @Output() loadingEvent = new EventEmitter<boolean>();

  constructor(private cardbackService: CardbacksService) {}

  ngOnInit(): void {
    this.cardbackService.getCardbacks().subscribe((resp) => {
      this.cardbacks = resp;
      this.loadingEvent.emit(false);
      this.cardbackService.saveCardbacksInLocalStorage(this.cardbacks);
    });
  }

  onDelete(cardbackId: number): void {
    this.cardbackService.deleteCardback(cardbackId);
    this.onSearch();
  }

  onSearch() {
    const cardbacks = this.cardbackService.getCardbacksFromLocalStorage();
    this.cardbacks = cardbacks.filter((cardback) =>
      cardback.name.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }

  onUpdate(cardback: Cardback): void {
    const editState = cardback.isEdit;
    const currentEditCardback = this.cardbacks.filter(
      (cardback) => cardback.isEdit
    );
    currentEditCardback.forEach((cardback) => (cardback.isEdit = false));
    cardback.isEdit = !editState;
  }
}
