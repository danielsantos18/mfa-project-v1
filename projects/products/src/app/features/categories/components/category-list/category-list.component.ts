import { CategoryService } from './../../services/category.service';
import { Component, OnInit, signal, output, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: string[] = [];
  selectedCategory = signal<string>(''); // ⬅️ signal para la categoría seleccionada

  // Salida moderna con signals
  readonly categorySelected = output<string>();

  private categoryService = inject(CategoryService);

  constructor() {
    // Mover el effect al constructor
    effect(() => {
      this.categorySelected.emit(this.selectedCategory());
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSelect(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(value);
  }
}
