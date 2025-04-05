import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GLOBAL_COCKTAILDB } from '../../../constants/global.constants';
import { Cocktail } from '../../cocktails/models/Cocktail.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly API_URL = `${GLOBAL_COCKTAILDB.API_BASE}`;
  private http = inject(HttpClient);

  // Obtener todas las categorías
  getCategories(): Observable<string[]> {
    return this.http.get<{ drinks: { strCategory: string }[] }>(`${this.API_URL}/list.php?c=list`)
      .pipe(map(response => response.drinks.map(cat => cat.strCategory)));
  }

  // Obtener cócteles filtrados por categoría
  getCocktailsByCategory(category: string): Observable<Cocktail[]> {
    return this.http.get<{ drinks: Cocktail[] }>(`${this.API_URL}/filter.php?c=${encodeURIComponent(category)}`)
      .pipe(map(response => response.drinks || []));
  }
}
