import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Saga } from '../interfaces/saga';

@Injectable({
  providedIn: 'root'
})
export class SagaService {
  
  private apiUrl = 'http://localhost:3000/sagas';

  constructor(private http: HttpClient) { }

  getSagas(): Observable<Saga[]> {
    return this.http.get<Saga[]>(this.apiUrl);
  }

  createSaga(saga: Omit<Saga, 'id'>): Observable<Saga> {
    return this.http.post<Saga>(this.apiUrl, saga);
  }

  updateSaga(id: number, saga: Partial<Saga>): Observable<Saga> {
    return this.http.patch<Saga>(`${this.apiUrl}/${id}`, saga);
  }

  deleteSaga(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}