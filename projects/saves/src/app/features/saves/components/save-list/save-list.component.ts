import { Cocktail } from './../../../../../../../products/src/app/features/cocktails/models/Cocktail.model';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CocktailService } from '../../../../../../../products/src/app/features/cocktails/services/cocktail.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-save-list',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './save-list.component.html',
  styleUrl: './save-list.component.scss'
})
export class SaveListComponent implements OnInit {
  private cocktailService = inject(CocktailService);
  favoriteCocktails = signal<Cocktail[]>([]); // Lista de cócteles favoritos

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const storedIds: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (storedIds.length === 0) return;

    const cocktailsList: Cocktail[] = [];

    storedIds.forEach(id => {
      this.cocktailService.getCocktailById(id).subscribe(response => {
        if (response) {
          cocktailsList.push(response);
          this.favoriteCocktails.set([...cocktailsList]); // Actualiza el estado reactivo
        }
      });
    });
  }

  removeFavorite(cocktailId: string) {
    let storedIds: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    storedIds = storedIds.filter((id: string) => id !== cocktailId);

    localStorage.setItem('favorites', JSON.stringify(storedIds));
    this.loadFavorites(); // Recargar la lista
  }

}
