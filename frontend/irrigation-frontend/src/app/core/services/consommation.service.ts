import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface ConsommationElectrique {
  id?: number;
  pompeId: number;
  energieUtilisee: number;
  duree?: number;
  dateMesure: string; // ISO string
}

@Injectable({ providedIn: 'root' })
export class ConsommationService {
  private readonly baseUrl = `${environment.apiBaseUrl}/energy/api/consommations`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ConsommationElectrique[]> {
    return this.http.get<ConsommationElectrique[]>(this.baseUrl);
  }

  getByPompe(pompeId: number): Observable<ConsommationElectrique[]> {
    return this.http.get<ConsommationElectrique[]>(`${this.baseUrl}/pompe/${pompeId}`);
  }

  getTotalByPompeAndPeriode(
    pompeId: number,
    from: string,
    to: string
  ): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/pompe/${pompeId}/total`,
      { params: { from, to } }
    );
  }

  checkAlerteSurconsommation(
    pompeId: number
  ): Observable<{ pompeId: number; surconsommation: boolean; message: string }> {
    return this.http.get<{ pompeId: number; surconsommation: boolean; message: string }>(
      `${this.baseUrl}/pompe/${pompeId}/alerte`
    );
  }

  create(c: ConsommationElectrique): Observable<ConsommationElectrique> {
    return this.http.post<ConsommationElectrique>(this.baseUrl, c);
  }

  update(id: number, c: ConsommationElectrique): Observable<ConsommationElectrique> {
    return this.http.put<ConsommationElectrique>(`${this.baseUrl}/${id}`, c);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
