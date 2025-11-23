// src/app/app.routes.ts
import { Routes } from '@angular/router';
// Importa el componente (verifica que la ruta del import sea correcta según tu estructura)
import { ListaLibrosComponent } from './components/lista-libros/lista-libros';
import { ListaSagasComponent } from './components/lista-sagas/lista-sagas'; // <-- Importar

export const routes: Routes = [
  // 1. Ruta explícita para ver la lista
  { path: 'libros', component: ListaLibrosComponent },

  // Nueva ruta para Sagas
  { path: 'sagas', component: ListaSagasComponent },

  // 2. Ruta por defecto (Redirección):
  // Si la URL está vacía (''), redirige automáticamente a 'libros'
  { path: '', redirectTo: 'libros', pathMatch: 'full' }
];