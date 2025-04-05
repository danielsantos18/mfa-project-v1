import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MFRouterLinkDirective } from '../../../../../products/src/app/shared/directives/MFRouterLinkDirective';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MFRouterLinkDirective, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
