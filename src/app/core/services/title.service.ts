// title.service.ts
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DynamicTitleService {
  constructor(
    private titleService: Title,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  init(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      const titleKey = data['title'];
      if (titleKey) {
        this.translate.get(titleKey).subscribe(translatedTitle => {
          this.titleService.setTitle(translatedTitle);
        });
      }
    });

    // Réagir au changement de langue
    this.translate.onLangChange.subscribe(() => {
      const currentRoute = this.router.routerState.root;
      this.updateTitle(currentRoute);
    });
  }

  private updateTitle(route: ActivatedRoute) {
    while (route.firstChild) route = route.firstChild;
    const titleKey = route.snapshot.data['title'];
    if (titleKey) {
      this.translate.get(titleKey).subscribe(translatedTitle => {
        this.titleService.setTitle(translatedTitle);
      });
    }
  }
}
