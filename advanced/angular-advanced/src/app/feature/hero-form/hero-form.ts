import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-hero-form',
  imports: [RouterOutlet],
  template: `
    <h2>Hero Form 表單示範</h2>
    <p>選擇上方「樣板驅動表單」或「響應式表單」檢視不同實作。</p>
    <router-outlet />
  `,
  styles: [':host { display: block; padding: 1rem; }'],
})
export class HeroForm {}