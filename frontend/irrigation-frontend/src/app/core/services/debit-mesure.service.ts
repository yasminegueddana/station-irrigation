import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface DebitMesure {
  id?: number;
  pompeId: number;
  debit: number;
  dateMesure: string;  // ISO string
  unite?: string;
}

@Injectable({ providedIn: 'root' })
export class DebitMesureService {
  private readonly baseUrl = `${environment.apiBaseUrl}/water/api/debits`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<DebitMesure[]> {
    return this.http.get<DebitMesure[]>(this.baseUrl);
  }

  getById(id: number): Observable<DebitMesure> {
    return this.http.get<DebitMesure>(`${this.baseUrl}/${id}`);
  }

  getByPompe(pompeId: number): Observable<DebitMesure[]> {
    return this.http.get<DebitMesure[]>(`${this.baseUrl}/pompe/${pompeId}`);
  }

  create(d: DebitMesure): Observable<DebitMesure> {
    return this.http.post<DebitMesure>(this.baseUrl, d);
  }

  update(id: number, d: DebitMesure): Observable<DebitMesure> {
    return this.http.put<DebitMesure>(`${this.baseUrl}/${id}`, d);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
