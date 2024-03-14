import { Injectable } from '@angular/core';
import { Cardback } from './carback';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardbacksService {
  constructor(private http: HttpClient) {}

  getCardbacks(): Observable<Cardback[]> {
    let headers = new HttpHeaders();
    headers = headers
      .set(
        'X-RapidAPI-Key',
        'ea6bd29831msh717c9816fd38315p1993f8jsn1a0141e134f5'
      )
      .set('X-RapidAPI-Host', 'omgvamp-hearthstone-v1.p.rapidapi.com');

    return this.http.get<Cardback[]>(
      'https://omgvamp-hearthstone-v1.p.rapidapi.com/cardbacks',
      {
        headers,
      }
    );
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
