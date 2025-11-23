import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Importamos OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../interfaces/libro';
import { LibroService } from '../../services/libro'; // 1. Importar el servicio

@Component({
  selector: 'app-lista-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-libros.html',
  styleUrl: './lista-libros.css'
})
export class ListaLibrosComponent implements OnInit { // Implementamos OnInit

  // Inicializamos el array vacío. Se llenará con datos del backend.
  libros: Libro[] = [];

  // Objeto para el formulario
  nuevoLibro: Libro = {
    id: 0, // El backend lo ignorará
    sagaId: 1, // Valor por defecto (puedes cambiarlo en el input)
    titulo: '',
    autor: '',
    fechaEdicion: '',
    numeroPaginas: 0,
    descripcion: ''
  };

  // 2. Inyectamos el servicio en el constructor
  constructor(
    private libroService: LibroService,
    private cd: ChangeDetectorRef
  ) {}

  // 3. Hook ngOnInit: Se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros() {
    // Nos suscribimos al Observable del servicio
    this.libroService.getLibros().subscribe({
      next: (datos) => {
        this.libros = datos; // Asignamos los datos reales a la variable
        console.log('Libros cargados:', datos);
      },
      error: (err) => console.error('Error al cargar libros:', err)
    });
  }

  // 4. Función actualizada para crear libros reales
  agregarLibro() {
    this.libroService.createLibro(this.nuevoLibro).subscribe({
      next: (libroCreado) => {
        // Actualizamos el array
        this.libros.push(libroCreado);
        
        // Limpiamos el formulario
        this.nuevoLibro = {
          id: 0,
          sagaId: 1,
          titulo: '',
          autor: '',
          fechaEdicion: '',
          numeroPaginas: 0,
          descripcion: ''
        };

        console.log('Libro agregado y vista actualizada');

        // --- 3. LA MAGIA: Forzar la actualización visual ---
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error del Backend:', err);
        alert('Hubo un error al guardar.');
      }
    });
  }
}