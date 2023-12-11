import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';
import { Todo } from './models/todo.model';


export const initialState: Todo[] = [
    new Todo('Vaya hijo de puta'),
    new Todo('Hacerme una pajilla en la mañana'),
    new Todo('Darle un besico al leo'),
    new Todo('Seguir llevando una vida tranquila')
];

export const todoReducer = createReducer<Todo[],Action>(
  initialState,
  on(actions.crear, (state,{texto}) => [...state, new Todo(texto)]),
  on(actions.borrar, (state,{id}) => state.filter(todo => todo.id!==id)),
  on(actions.toggle, (state,{id})  => {
    return structuredClone(state).map(todo => {      
      if (todo.id === id) {
        todo.completado = !todo.completado;
      }
      return todo;
    });
  }) ,
  on(actions.toggleAll, (state,{completado})  => {
    return structuredClone(state).map(todo => {      
      todo.completado = completado;
      return todo;
    });
  }),
  on(actions.editar, (state,{id,texto})  => {
    return structuredClone(state).map(todo => {      
      if (todo.id === id) {
        todo.texto = texto;
      }
      return todo;
    });
  }) ,
  on(actions.limpiarCompletados, (state) => state.filter(todo => !todo.completado))      
);