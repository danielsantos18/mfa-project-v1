import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatIngredient',
  standalone: true
})
export class FormatIngredientPipe implements PipeTransform {
  transform(cocktail: any): string[] {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`] || '';
      if (ingredient) {
        ingredients.push(`${ingredient} (${measure.trim()})`);
      }
    }
    return ingredients;
  }
}
