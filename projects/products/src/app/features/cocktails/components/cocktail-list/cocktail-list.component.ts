import { Component, inject, signal } from '@angular/core';
import { CocktailService } from '../../services/cocktail.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { Cocktail } from '../../models/Cocktail.model';
import { MFRouterLinkDirective } from '../../../../shared/directives/MFRouterLinkDirective';
import { CategoryListComponent } from '../../../categories/components/category-list/category-list.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MFRouterLinkDirective, CategoryListComponent, ToastrModule],
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent {
  private cocktailService = inject(CocktailService);
  private toastr = inject(ToastrService);

  categories: string[] = [];
  selectedCategory: string = '';
  cocktails = signal<Cocktail[]>([]);
  favorites = signal<string[]>(this.getFavorites());

  constructor() {
    this.loadCocktails();
  }

  loadCocktails() {
    this.cocktailService.getCocktailsByLetter('m').subscribe({
      next: (data) => this.cocktails.set(data),
      error: (err) => console.error('Error loading cocktails:', err)
    });
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;

    if (!category) {
      this.loadCocktails();
      return;
    }

    this.cocktailService.getCocktailsByCategory(category).subscribe({
      next: (data) => this.cocktails.set(data),
      error: (err) => console.error('Error filtering by category:', err)
    });
  }

  onSearchCocktail(term: string) {
    if (!term.trim()) {
      this.loadCocktails();
      return;
    }

    this.cocktailService.searchCocktail(term).subscribe({
      next: (data) => this.cocktails.set(data),
      error: (err) => console.error('Error searching cocktails:', err)
    });
  }

  toggleFavorite(cocktail: Cocktail) {
    const favs = this.getFavorites();
    const wasFavorite = favs.includes(cocktail.idDrink);

    const updatedFavorites = wasFavorite
      ? favs.filter(id => id !== cocktail.idDrink)
      : [...favs, cocktail.idDrink];

    this.saveFavorites(updatedFavorites);
    this.favorites.set(updatedFavorites);

    // Mostrar notificación
    if (wasFavorite) {
      this.toastr.error(`${cocktail.strDrink} removido de favoritos`, 'Favoritos');
    } else {
      this.toastr.success(`${cocktail.strDrink} agregado a favoritos`, 'Favoritos');
    }
  }

  isFavorite(cocktailId: string): boolean {
    return this.favorites().includes(cocktailId);
  }

  private getFavorites(): string[] {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch (e) {
      console.error('Error reading favorites:', e);
      return [];
    }
  }

  private saveFavorites(favorites: string[]): void {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving favorites:', e);
    }
  }
}
