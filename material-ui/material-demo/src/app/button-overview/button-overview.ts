import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

/** @title Basic buttons */
@Component({
  selector: 'app-button-overview',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './button-overview.html',
  styleUrl: './button-overview.css',
})
export class ButtonOverview {}