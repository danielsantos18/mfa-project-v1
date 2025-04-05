import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GLOBAL_COCKTAILDB } from '../../../constants/global.constants';
import { Cocktail } from '../models/Cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private readonly API_URL = `${GLOBAL_COCKTAILDB.API_BASE}`;
  private http = inject(HttpClient);

  // Buscar cócteles por nombre
  searchCocktail(name: string): Observable<Cocktail[]> {
    return this.http.get<{ drinks: Cocktail[] }>(`${this.API_URL}/search.php?s=${name}`)
      .pipe(map(response => response.drinks || []));
  }

  // Buscar cócteles por primera letra
  getCocktailsByLetter(letter: string): Observable<Cocktail[]> {
    return this.http.get<{ drinks: Cocktail[] }>(`${this.API_URL}/search.php?f=${letter}`)
      .pipe(map(response => response.drinks || []));
  }

  // Buscar cócteles por ingrediente
  getCocktailsByIngredient(ingredient: string): Observable<Cocktail[]> {
    return this.http.get<{ drinks: Cocktail[] }>(`${this.API_URL}/filter.php?i=${ingredient}`)
      .pipe(map(response => response.drinks || []));
  }

  // Obtener detalles de un cóctel por ID
  getCocktailById(id: string): Observable<Cocktail | null> {
    return this.http.get<{ drinks: Cocktail[] }>(`${this.API_URL}/lookup.php?i=${id}`)
      .pipe(map(response => response.drinks ? response.drinks[0] : null));
  }

  // Obtener un cóctel aleatorio
  getRandomCocktail(): Observable<Cocktail | null> {
    return this.http.get<{ drinks: Cocktail[] }>(`${this.API_URL}/random.php`)
      .pipe(map(response => response.drinks ? response.drinks[0] : null));
  }
}
