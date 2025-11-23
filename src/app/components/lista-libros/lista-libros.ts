import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../interfaces/libro';
import { LibroService } from '../../services/libro';

@Component({
  selector: 'app-lista-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-libros.html', // Asegurate que se llame así
  styleUrl: './lista-libros.css'      // Asegurate que se llame así
})
export class ListaLibrosComponent implements OnInit {

  libros: Libro[] = [];
  esEdicion: boolean = false;

  // Modelo inicial
  nuevoLibro: Libro = {
    id: 0,
    sagaId: 1,
    titulo: '',
    autor: '',
    fechaEdicion: '',
    numeroPaginas: 0,
    descripcion: ''
  };

  constructor(
    private libroService: LibroService,
    // private cd: ChangeDetectorRef // Vital para el refresco manual
  ) {}

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros() {
    this.libroService.getLibros().subscribe({
      next: (datos) => {
        this.libros = datos;
        // this.cd.detectChanges(); // Asegura renderizado inicial
      },
      error: (err) => console.error(err)
    });
  }

  // Decide si crea o edita
  procesarFormulario() {
    if (this.esEdicion) {
      this.actualizarLibro();
    } else {
      this.agregarLibro();
    }
  }

  // LOGICA DE CREAR
agregarLibro() {
    this.libroService.createLibro(this.nuevoLibro).subscribe({
      next: (libroCreado) => {
        // 1. Actualizamos datos
        this.libros = [...this.libros, libroCreado];
        this.limpiarFormulario();

        // 2. Forzamos la actualización de la vista
//        this.cd.detectChanges(); 

        // 3. LA SOLUCIÓN: Envolvemos el alert en un setTimeout
        // Esto permite que Angular termine de "pintar" la tarjeta nueva
        // antes de congelar la pantalla con el mensaje.
        setTimeout(() => {
          alert('Libro creado con éxito');
        }, 50); // 50 milisegundos es imperceptible para el humano, pero eterno para la CPU
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear.');
      }
    });
  }

  // LOGICA DE PREPARAR EDICIÓN
  cargarDatosParaEditar(libro: Libro) {
    this.esEdicion = true;
    // Clonamos el objeto y recortamos la fecha para el input type="date"
    this.nuevoLibro = { 
      ...libro,
      fechaEdicion: libro.fechaEdicion ? libro.fechaEdicion.toString().split('T')[0] : ''
    };
  }

  // LOGICA DE ACTUALIZAR (Aquí estaba el problema visual)
  actualizarLibro() {
    const id = this.nuevoLibro.id;
    this.libroService.updateLibro(id, this.nuevoLibro).subscribe({
      next: (libroActualizado) => {
        // Actualizamos el item específico en el array local
        const index = this.libros.findIndex(l => l.id === id);
        if (index !== -1) {
          this.libros[index] = libroActualizado;
          // Truco: Forzar nueva referencia del array para asegurar que el *ngFor se entere
          this.libros = [...this.libros];
        }

        this.limpiarFormulario();
        
    setTimeout(() => {       // Después molestamos al usuario
      alert('Libro actualizado con éxito');
    }, 50);
  },
      error: (err) => console.error(err)
    });
  }

  // LOGICA DE BORRAR
  borrarLibro(id: number) {
    if (!confirm('¿Borrar este libro?')) return;

    this.libroService.deleteLibro(id).subscribe({
      next: () => {
        this.libros = this.libros.filter(l => l.id !== id);
      },
      error: (err) => alert('Error al borrar')
    });
  }

  // RESETEAR FORMULARIO
  limpiarFormulario() {
    this.esEdicion = false;
    this.nuevoLibro = {
      id: 0,
      sagaId: 1,
      titulo: '',
      autor: '',
      fechaEdicion: '',
      numeroPaginas: 0,
      descripcion: ''
    };
  }
}