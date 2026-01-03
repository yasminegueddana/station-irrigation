import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface Pompe {
  id?: number;
  reference: string;
  puissance: number;
  statut: string;
  dateMiseEnService: string;
}

@Injectable({ providedIn: 'root' })
export class PompeService {
  private readonly baseUrl = `${environment.apiBaseUrl}/energy/api/pompes`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pompe[]> {
    return this.http.get<Pompe[]>(this.baseUrl);
  }

  create(pompe: Pompe): Observable<Pompe> {
    return this.http.post<Pompe>(this.baseUrl, pompe);
  }
  getById(id: number): Observable<Pompe> {
    return this.http.get<Pompe>(`${this.baseUrl}/${id}`);
  }

  getDisponibilite(id: number): Observable<{ pompeId: string; disponibilite: string }> {
    return this.http.get<{ pompeId: string; disponibilite: string }>(
      `${this.baseUrl}/${id}/disponibilite`
    );
  }


  update(id: number, pompe: Pompe): Observable<Pompe> {
    return this.http.put<Pompe>(`${this.baseUrl}/${id}`, pompe);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
