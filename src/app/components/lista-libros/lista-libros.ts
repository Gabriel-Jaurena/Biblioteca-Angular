import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importar FormsModule
import { FormsModule } from '@angular/forms'; 
import { Libro } from '../../interfaces/libro';

@Component({
  selector: 'app-lista-libros',
  standalone: true,
  // 2. Añadirlo al array de imports
  imports: [CommonModule, FormsModule], 
  templateUrl: './lista-libros.html',
  styleUrl: './lista-libros.css'
})
export class ListaLibrosComponent {
  
  // Objeto temporal para el formulario (Two-Way Binding)
  nuevoLibro: Libro = {
    id: 0,
    sagaId: 0,
    titulo: '',
    autor: '',
    fechaEdicion: '',
    numeroPaginas: 0,
    descripcion: ''
  };

  libros: Libro[] = [
    // ... (tus libros mock que ya tenías) ...
    { id: 1, sagaId: 1, titulo: 'El Imperio Final', autor: 'Brandon Sanderson', fechaEdicion: '2006-07-17', numeroPaginas: 672, descripcion: 'Vin descubre sus poderes...' },
    { id: 2, sagaId: 2, titulo: 'El Camino de los Reyes', autor: 'Brandon Sanderson', fechaEdicion: '2010-08-31', numeroPaginas: 1200, descripcion: 'Kaladin lucha por sobrevivir...' }
  ];

  // Función para el Event Binding (click)
  agregarLibro() {
    // Creamos una copia del libro para no sobreescribirlo al seguir editando
    const libroAGuardar: Libro = { ...this.nuevoLibro, id: this.libros.length + 1 };
    
    this.libros.push(libroAGuardar);

    // Limpiamos el formulario
    this.nuevoLibro = { id: 0, sagaId: 0, titulo: '', autor: '', fechaEdicion: '', numeroPaginas: 0, descripcion: '' };
  }
}