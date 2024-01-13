import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todo.service';

@Component({
  selector: 'app-todos-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
})
export class MainComponent {
  todosService = inject(TodosService);
}
