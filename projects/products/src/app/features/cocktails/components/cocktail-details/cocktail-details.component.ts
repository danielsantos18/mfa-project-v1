import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CocktailService } from '../../services/cocktail.service';
import { CommonModule } from '@angular/common';
import { Cocktail } from '../../models/Cocktail.model';
import { MFRouterLinkDirective } from '../../../../shared/directives/MFRouterLinkDirective';

@Component({
  selector: 'app-cocktail-details',
  imports: [CommonModule, MFRouterLinkDirective],
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss'],
  standalone: true
})
export class CocktailDetailsComponent implements OnInit {

  private cocktailService = inject(CocktailService);
  private route = inject(ActivatedRoute);
  cocktail = signal<Cocktail | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cocktailService.getCocktailById(id).subscribe(data => {
        this.cocktail.set(data);
      });
    }
  }

  getIngredients(): string[] {
    const cocktailValue = this.cocktail();
    if (!cocktailValue) return [];

    const ingredients: string[] = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = (cocktailValue as any)['strIngredient' + i];
      const measure = (cocktailValue as any)['strMeasure' + i] || '';
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }

    return ingredients;
  }

}
