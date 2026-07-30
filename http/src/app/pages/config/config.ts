import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfigService } from '../../services/config.service';
import { Config } from '../../models/config';

@Component({
  selector: 'app-config',
  imports: [],
  templateUrl: './config.html',
  styleUrl: './config.css',
})
export class ConfigComponent implements OnInit {
  private readonly configService = inject(ConfigService);
  private readonly destroyRef = inject(DestroyRef);

  readonly config = signal<Config | null>(null);

  ngOnInit(): void {
    this.configService
      .getConfig()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => this.config.set(data));
  }
}