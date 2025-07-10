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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
    MatPaginatorModule,
  ],
  templateUrl: './cardbacks.component.html',
  styleUrl: './cardbacks.component.scss',
})
export class CardbacksComponent {
  allCardbacks: Cardback[] = []; // Store all cardbacks from localStorage
  cardbacks: Cardback[] = []; // Cardbacks currently displayed (paginated)
  searchInput = '';
  createNew = false;
  @Output() loadingEvent = new EventEmitter<boolean>();

  // Pagination properties
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  length = 0; // Total number of items

  constructor(private cardbackService: CardbacksService) { }

  ngOnInit() {
    // Set loading state to true initially
    this.loadingEvent.emit(true);

    this.cardbackService.getCardBack().subscribe({
      next: (cardbacks) => {
        this.allCardbacks = cardbacks;
        this.cardbackService.saveCardbacksInLocalStorage(this.allCardbacks);
        this.applyPaginationAndSearch();
        this.loadingEvent.emit(false);
      },
      error: (error) => {
        console.error('Failed to load cardbacks:', error);
        this.allCardbacks = this.cardbackService.getCardbacksFromLocalStorage();
        this.applyPaginationAndSearch();
        this.loadingEvent.emit(false);
      },
    });
  }

  applyPaginationAndSearch() {
    let filteredCardbacks = this.allCardbacks.filter((cardback) =>
      cardback.name.toLowerCase().includes(this.searchInput.toLowerCase())
    );

    this.length = filteredCardbacks.length;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.cardbacks = filteredCardbacks.slice(startIndex, endIndex);
  }

  onDelete(cardbackId: number): void {
    this.cardbackService.deleteCardback(cardbackId);
    this.allCardbacks = this.cardbackService.getCardbacksFromLocalStorage(); // Refresh allCardbacks after deletion
    this.applyPaginationAndSearch();
  }

  onSearch() {
    // Reset page index to 0 when searching
    this.pageIndex = 0;
    this.applyPaginationAndSearch();
  }

  onUpdate(cardback: Cardback): void {
    const editState = cardback.isEdit;
    const currentEditCardback = this.cardbacks.filter(
      (cardback) => cardback.isEdit
    );
    currentEditCardback.forEach((cardback) => (cardback.isEdit = false));
    cardback.isEdit = !editState;
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.applyPaginationAndSearch();
  }
}
