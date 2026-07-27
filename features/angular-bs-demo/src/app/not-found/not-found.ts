import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="d-flex flex-column align-items-center justify-content-center vh-50 py-5">
      <h1 class="display-1 fw-bold text-danger">404</h1>
      <p class="lead">The page you requested does not exist.</p>
      <a class="btn btn-outline-primary" routerLink="/home">Back to Home</a>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class NotFound {}