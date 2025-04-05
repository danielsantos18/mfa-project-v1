import { MFE_PRODUCT_CONSTANTS } from './../constans/constants';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MFNavigateService {

  private _navigation = signal(false);
  private _navigation$!: Observable<boolean>;

  private router = inject(Router);

  constructor() {
    this._navigation$ = toObservable(this._navigation);
  }

  navigate(route: string, extras?: NavigationExtras) {

    console.log('navigate: ');
    console.log('route: ' + route);

    if ((window as any).isHost) {

      let sw = (window as any).isHost;
      let lg = (window as any).language;

      console.log('sw...' + sw);
      console.log('lg...' + lg);

      if (sw) {

        window.dispatchEvent(
          new CustomEvent('mfRouteChanged', {
            detail: {
              route: `${MFE_PRODUCT_CONSTANTS.HOST_ROUTE}/${route}`,
              extras,
            },
          })
        );

      } else {
        console.log('else sw');
        this.router.navigate([route], extras);
      }
    } else {

      console.log('is not Host');
      console.log(extras)
      console.log('route: ' + route);

      const url = String(route);

      console.log('url: ' + url);

      this.router.navigate([url],
        {
          queryParams: null,
          replaceUrl: true
        })

    }

    this._navigation.set(true);
  }

  get navigation(): Observable<boolean> {
    return this._navigation$;
  }
}
