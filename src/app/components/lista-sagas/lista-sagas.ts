import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Saga } from '../../interfaces/saga';
import { SagaService } from '../../services/saga';

@Component({
  selector: 'app-lista-sagas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-sagas.html', // Ajusta si tu archivo tiene otro nombre
  styleUrl: './lista-sagas.css'
})
export class ListaSagasComponent implements OnInit {

  sagas: Saga[] = [];

  // Modelo para el formulario
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
      next: (datos) => {
        this.sagas = datos;
      },
      error: (err) => console.error('Error al cargar sagas:', err)
    });
  }

  agregarSaga() {
    // Parche simple para la fecha si está vacía (opcional)
    if (!this.nuevaSaga.fechaInicio) {
       // Podrías asignar hoy o dejarlo vacío si el backend lo permite
       // this.nuevaSaga.fechaInicio = new Date().toISOString().split('T')[0];
    }

    this.sagaService.createSaga(this.nuevaSaga).subscribe({
      next: (sagaCreada) => {
        this.sagas = [...this.sagas, sagaCreada];
        
        // Limpiar formulario
        this.nuevaSaga = {
          id: 0,
          nombre: '',
          description: '',
          fechaInicio: '',
          era: ''
        };
        console.log('Saga creada');
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear la saga.');
      }
    });
  }

  borrarSaga(id: number) {
    if(!confirm('¿Borrar esta saga? Se borrarán también sus libros.')) return;
    
    this.sagaService.deleteSaga(id).subscribe({
      next: () => {
        this.sagas = this.sagas.filter(s => s.id !== id);
      },
      error: (err) => alert('Error al borrar saga')
    });
  }
}