import { Component, inject, signal } from '@angular/core';
import { CocktailService } from '../../services/cocktail.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { Cocktail } from '../../models/Cocktail.model';
import { MFRouterLinkDirective } from '../../../../shared/directives/MFRouterLinkDirective';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MFRouterLinkDirective],
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent {
  private cocktailService = inject(CocktailService);
  cocktails = signal<Cocktail[]>([]);
  favorites = signal<string[]>(this.getFavorites()); // Cargar favoritos al iniciar

  constructor() {
    this.loadCocktails();
  }

  loadCocktails() {
    this.cocktailService.getCocktailsByLetter('m').subscribe(data => {
      this.cocktails.set(data);
    });
  }

  onSearchCocktail(term: string) {
    if (!term.trim()) {
      this.loadCocktails();
      return;
    }
    this.cocktailService.searchCocktail(term).subscribe(data => {
      this.cocktails.set(data);
    });
  }

  // Verificar si el cóctel está en favoritos
  isFavorite(cocktailId: string): boolean {
    return this.favorites().includes(cocktailId);
  }

  // Obtener favoritos desde localStorage
  getFavorites(): string[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  toggleFavorite(cocktailId: string) {
    let favs = this.getFavorites();

    if (favs.includes(cocktailId)) {
      favs = favs.filter(id => id !== cocktailId); // Eliminar de favoritos
    } else {
      favs.push(cocktailId); // Agregar a favoritos
    }

    localStorage.setItem('favorites', JSON.stringify(favs));
    this.favorites.set(favs); // Actualizar el estado
  }
}
