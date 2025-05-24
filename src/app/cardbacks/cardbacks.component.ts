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

  constructor(private cardbackService: CardbacksService) { }

  ngOnInit() {
    // Set loading state to true initially
    this.loadingEvent.emit(true);

    this.cardbackService.getCardBack().subscribe({
      next: (cardbacks) => {
        // Directly assign the cardbacks array
        console.log('Response from service:', cardbacks);
        this.cardbacks = cardbacks;

        console.log('cardbacks assigned: ', this.cardbacks);

        // Save to localStorage for offline use
        this.cardbackService.saveCardbacksInLocalStorage(this.cardbacks);

        // Update loading state
        this.loadingEvent.emit(false);
      },
      error: (error) => {
        console.error('Failed to load cardbacks:', error);

        // Try to load from localStorage as fallback
        this.cardbacks = this.cardbackService.getCardbacksFromLocalStorage();

        // Update loading state even on error
        this.loadingEvent.emit(false);
      },
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
