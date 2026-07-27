import { Component, inject, signal } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { Config } from '../../models/config';

@Component({
  selector: 'app-config',
  imports: [],
  templateUrl: './config.html',
  styleUrl: './config.css',
})
export class ConfigComponent {
  private readonly configService = inject(ConfigService);

  readonly config = signal<Config | null>(null);

  ngOnInit(): void {
    this.configService.getConfig().subscribe((data) => this.config.set(data));
  }
}