import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface Reservoir {
  id?: number;
  nom: string;
  capaciteTotale: number;
  volumeActuel: number;
  localisation?: string;
}

@Injectable({ providedIn: 'root' })
export class ReservoirService {
  private readonly baseUrl = `${environment.apiBaseUrl}/water/api/reservoirs`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Reservoir[]> {
    return this.http.get<Reservoir[]>(this.baseUrl);
  }

  getById(id: number): Observable<Reservoir> {
    return this.http.get<Reservoir>(`${this.baseUrl}/${id}`);
  }

  create(r: Reservoir): Observable<Reservoir> {
    return this.http.post<Reservoir>(this.baseUrl, r);
  }

  update(id: number, r: Reservoir): Observable<Reservoir> {
    return this.http.put<Reservoir>(`${this.baseUrl}/${id}`, r);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
