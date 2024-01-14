import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todo.service';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {
  todosService = inject(TodosService);
  editingId: string | null = null;

  visibleTodos = computed(() => {
    const todos = this.todosService.todosSig();
    const filter = this.todosService.filterSig();

    if (filter === FilterEnum.active) {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted);
    }
    return todos;
  });
  isAllTodosSelected = computed(() => {
    this.todosService.todosSig().every((todo) => todo.isCompleted);
  });
  noTodosClass = computed(() => this.todosService.todosSig().length === 0);

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }
}
