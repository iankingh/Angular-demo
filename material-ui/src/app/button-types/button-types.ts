import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/** @title Button varieties */
@Component({
  selector: 'app-button-types',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './button-types.html',
  styleUrl: './button-types.css',
})
export class ButtonTypes {}