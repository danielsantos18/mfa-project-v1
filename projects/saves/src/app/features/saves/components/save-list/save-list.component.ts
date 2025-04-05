import { Cocktail } from './../../../../../../../products/src/app/features/cocktails/models/Cocktail.model';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CocktailService } from '../../../../../../../products/src/app/features/cocktails/services/cocktail.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-save-list',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './save-list.component.html',
  styleUrl: './save-list.component.scss'
})
export class SaveListComponent implements OnInit {
  private cocktailService = inject(CocktailService);
  private toastService = inject(ToastrService);
  favoriteCocktails = signal<Cocktail[]>([]);

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
          this.favoriteCocktails.set([...cocktailsList]);
        }
      });
    });
  }

  removeFavorite(cocktailId: string) {
    let storedIds: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    storedIds = storedIds.filter((id: string) => id !== cocktailId);

    localStorage.setItem('favorites', JSON.stringify(storedIds));
    this.toastService.info(`removido de favoritos`, 'Favoritos');
    this.loadFavorites();
  }
}
