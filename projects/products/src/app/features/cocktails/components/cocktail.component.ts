import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MFRouterLinkDirective } from '../../../shared/directives/MFRouterLinkDirective';

@Component({
  selector: 'app-cocktail',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.scss',
})
export class CocktailComponent {

}
