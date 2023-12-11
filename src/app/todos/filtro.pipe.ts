import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';
import { filtrosValidos } from '../filtro/filtro.actions';

@Pipe({
  name: 'filtroTodo'
})
export class FiltroPipe implements PipeTransform {
  result!: Todo[];
  transform(todos: Todo[] , filtro: filtrosValidos): Todo[] {
    if (filtro ==='todos') this.result = todos;
    else 
      this.result = todos.filter(todo => todo.completado === filtro.includes('completado'));    
    return this.result;
  }

}
