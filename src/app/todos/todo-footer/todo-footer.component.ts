import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actionsFilter from '../../filtro/filtro.actions';
import * as actionsTodos from '../todo.actions';
import { AppState } from 'src/app/app.reduder';


@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  filtroActual!: actionsFilter.filtrosValidos;
  filtros: actionsFilter.filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  pendientes: number = 0;

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });
  }

  cambiarFiltro(filtro: actionsFilter.filtrosValidos){
     this.store.dispatch(actionsFilter.setFiltro({filtro:filtro}));
  }

  limpiarCompletados(){
    this.store.dispatch(actionsTodos.limpiarCompletados());
  }

}
