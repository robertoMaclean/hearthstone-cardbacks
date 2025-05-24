import { Injectable } from '@angular/core';
import { Cardback } from './carback';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, retry, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Interface for the API response
interface CardbacksResponse {
  cardBacks: Cardback[];
}

@Injectable({
  providedIn: 'root',
})
export class CardbacksService {
  private readonly NETLIFY_FUNCTION_PATH = '/.netlify/functions/hearthstone';
  private readonly LOCAL_NETLIFY_URL = 'http://localhost:8888';
  public cardBacks: any[] = [];

  // Determine the appropriate base URL based on environment
  private getApiUrl(): string {
    console.log('api url', environment.production);
    return environment.production
      ? this.NETLIFY_FUNCTION_PATH
      : `${this.LOCAL_NETLIFY_URL}${this.NETLIFY_FUNCTION_PATH}`;
  }

  constructor(private http: HttpClient) { }

  getCardBack(): Observable<Cardback[]> {
    const apiUrl = this.getApiUrl();

    return this.http.get<any>(apiUrl).pipe(
      retry(1), // Retry once on failure
      tap((response) => (this.cardBacks = response)), // Log the response for debugging

      catchError((error) => {
        // If we're in development and get a network error, it might be due to CORS or Netlify function issues
        if (!environment.production && error instanceof HttpErrorResponse) {
          console.warn('Development environment API error:', error);
          console.info('Falling back to localStorage data');

          // Return the data from localStorage as a fallback in dev mode
          return of(this.getCardbacksFromLocalStorage());
        }

        // Otherwise use standard error handling
        return this.handleError(error);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;

      // Log the raw response if available
      console.log(error);
      if (error.error) {
        console.error('Server response body:', error.error);
      }
    }

    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
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
