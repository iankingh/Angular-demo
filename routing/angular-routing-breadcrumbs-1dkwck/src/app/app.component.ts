import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  mapping = new Map<string, string>([
    ['/page-a', 'Page A'],
    ['/page-b', 'Page B']
  ]);

  breadcrumbs = '';

  constructor(private router: Router) {
    router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map((e: NavigationEnd) => e.url)
      )
      .subscribe(url => {
        console.log(url);
        this.breadcrumbs = this.mapping.get(url);
      })
  }
}
