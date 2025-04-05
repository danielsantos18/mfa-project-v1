import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, Injector, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { Cocktail } from '../../../products/src/app/features/cocktails/models/Cocktail.model';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'dashboard';
  injector = inject(Injector);
  private router = inject(Router);

  product?: Cocktail
  quantity: number = 0;

  ngOnInit(): void {
    (window as any).isHost = true;
    (window as any).language = 'es';
  }

  @HostListener('window:mfRouteChanged', ['$event'])
  onMFChildRouteChanged(event: any) {
    console.log('Host window:mfRouteChanged...')
    console.log(event.detail.route)
    console.log(event.detail.extras)

    this.router.navigate([event.detail.route], event.detail.extras);
  }

  @HostListener('window:mfProductReserved', ['$event'])
  onMFProductReserved(event: any) {

    console.log('Host window:mfProductReserved...')
    console.log(event.detail.product)
    console.log(event.detail.quantity)

    this.product = event.detail.product
    this.quantity = event.detail.quantity

  }
}

