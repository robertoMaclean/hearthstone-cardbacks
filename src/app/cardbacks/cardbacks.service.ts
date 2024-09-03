import { Injectable } from '@angular/core';
import { Cardback } from './carback';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CardbacksService {
  private getCard = '/.netlify/functions/hearthstone';

  constructor() {}

  async getCardBack(): Promise<any> {
    try {
      const response = await fetch(this.getCard);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  deleteCardback(cardBackId: number): void {
    let cardbacks = this.getCardbacksFromLocalStorage();
    cardbacks = cardbacks.filter(
      (cardback) => cardback.cardBackId !== cardBackId
    );
    this.saveCardbacksInLocalStorage(cardbacks);
  }

  updateCardback(cardbackToUpdate: Cardback): void {
    const cardbacks = this.getCardbacksFromLocalStorage();
    const cardbackIndex = cardbacks.findIndex(
      (cardback) => cardback.cardBackId === cardbackToUpdate.cardBackId
    );
    if (cardbackIndex !== -1) {
      cardbacks[cardbackIndex] = cardbackToUpdate;
      this.saveCardbacksInLocalStorage(cardbacks);
    }
  }

  addCardback(cardback: Cardback): void {
    const cardbacks = this.getCardbacksFromLocalStorage();
    cardbacks.unshift(cardback);
    this.saveCardbacksInLocalStorage(cardbacks);
  }

  public saveCardbacksInLocalStorage(cardbacks: Cardback[]) {
    localStorage.setItem('cardbacks', JSON.stringify(cardbacks));
  }

  getCardbacksFromLocalStorage(): Cardback[] {
    const cardbacks = localStorage.getItem('cardbacks');
    return cardbacks ? JSON.parse(cardbacks) : [];
  }
}
