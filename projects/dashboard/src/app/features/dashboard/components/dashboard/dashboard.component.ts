import { Component, HostListener, inject, Injector } from '@angular/core';
import { Cocktail } from '../../../../../../../products/src/app/features/cocktails/models/Cocktail.model';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MFRouterLinkDirective } from '../../../../../../../products/src/app/shared/directives/MFRouterLinkDirective';
import { FooterComponent } from '../../../../shared/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, MFRouterLinkDirective, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  injector = inject(Injector);
  private router = inject(Router);

  product?: Cocktail
  quantity: number = 0;

  ngOnInit(): void {
    (window as any).isHost = true;
    (window as any).language = 'es';
  }
}
