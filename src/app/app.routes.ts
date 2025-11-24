import { Routes } from '@angular/router';
import { ListaLibrosComponent } from './components/lista-libros/lista-libros';
import { DetalleLibroComponent } from './components/detalle-libro/detalle-libro'; // Importar
import { ListaSagasComponent } from './components/lista-sagas/lista-sagas';

export const routes: Routes = [
  { path: 'libros', component: ListaLibrosComponent },
  
  // NUEVA RUTA PARA DETALLE
  { path: 'libros/:id', component: DetalleLibroComponent },

  { path: 'sagas', component: ListaSagasComponent },
  { path: '', redirectTo: 'libros', pathMatch: 'full' }
];