import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardbacksComponent } from './cardbacks/cardbacks.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CardbacksComponent,
    MatProgressBarModule,
    NgIf,
    MatToolbarModule,
  ],
  providers: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'HearthStone';
  loading = true;

  setLoader(isLoading: boolean) {
    console.log('current loading', this.loading);
    this.loading = isLoading;
    console.log('change to', this.loading);
  }
}
