// src/app/services/libro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro'; // Importamos tu interfaz

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la app
})
export class LibroService {
  
  // La URL de tu API NestJS (backend)
  private apiUrl = 'http://localhost:3000/libros';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los libros (GET /libros)
  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  // Método para crear un libro (POST /libros)
  createLibro(libro: Omit<Libro, 'id'>): Observable<Libro> {
    // Omitimos 'id' porque el backend lo genera
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  // Método para borrar un libro (DELETE /libros/:id)
  deleteLibro(id: number): Observable<void> {
    // Construimos la URL específica: http://localhost:3000/libros/5
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para actualizar (PATCH /libros/:id)
  updateLibro(id: number, libro: Partial<Libro>): Observable<Libro> {
    // Enviamos solo los datos que cambiaron (o todos, el backend lo maneja)
    return this.http.patch<Libro>(`${this.apiUrl}/${id}`, libro);
  }
}