import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Saga } from '../../interfaces/saga';
import { SagaService } from '../../services/saga';

@Component({
  selector: 'app-lista-sagas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-sagas.html',
  styleUrl: './lista-sagas.css'
})
export class ListaSagasComponent implements OnInit {

  sagas: Saga[] = [];
  esEdicion: boolean = false;

  // Modelo del formulario
  nuevaSaga: Saga = {
    id: 0,
    nombre: '',
    description: '',
    fechaInicio: '',
    era: ''
  };

  constructor(private sagaService: SagaService) {}

  ngOnInit(): void {
    this.cargarSagas();
  }

  cargarSagas() {
    this.sagaService.getSagas().subscribe({
      next: (datos) => this.sagas = datos,
      error: (err) => console.error(err)
    });
  }

  procesarFormulario() {
    if (this.esEdicion) {
      this.actualizarSaga();
    } else {
      this.agregarSaga();
    }
  }

  agregarSaga() {
    this.sagaService.createSaga(this.nuevaSaga).subscribe({
      next: (sagaCreada) => {
        // Inmutabilidad para que Angular detecte el cambio
        this.sagas = [...this.sagas, sagaCreada];
        this.limpiarFormulario();
        alert('Saga creada con éxito');
      },
      error: (err) => alert('Error al crear saga')
    });
  }

  actualizarSaga() {
    const id = this.nuevaSaga.id;
    this.sagaService.updateSaga(id, this.nuevaSaga).subscribe({
      next: (sagaActualizada) => {
        this.sagas = this.sagas.map(s => s.id === id ? sagaActualizada : s);
        this.limpiarFormulario();
        alert('Saga actualizada');
      },
      error: (err) => alert('Error al actualizar')
    });
  }

  borrarSaga(id: number) {
    if(!confirm('¿Borrar esta saga? ATENCIÓN: Se borrarán todos los libros asociados.')) return;

    this.sagaService.deleteSaga(id).subscribe({
      next: () => {
        this.sagas = this.sagas.filter(s => s.id !== id);
      },
      error: (err) => alert('Error al borrar. Quizás tiene libros y la BD no permite cascada.')
    });
  }

  cargarDatosParaEditar(saga: Saga) {
    this.esEdicion = true;
    this.nuevaSaga = { 
      ...saga,
      // Recorte de fecha para el input date
      fechaInicio: saga.fechaInicio ? saga.fechaInicio.toString().split('T')[0] : ''
    };
  }

  limpiarFormulario() {
    this.esEdicion = false;
    this.nuevaSaga = { id: 0, nombre: '', description: '', fechaInicio: '', era: '' };
  }
}