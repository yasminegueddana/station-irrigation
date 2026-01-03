import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface AlerteEau {
  id?: number;
  pompeId: number;
  totalEnergie: number;
  dateAlerte: string;
  message: string;
  statut: string;    // NON_TRAITEE, EN_COURS, RESOLUE
  severite?: string; // INFO, WARNING, CRITIQUE
}

@Injectable({ providedIn: 'root' })
export class AlerteEauService {
  private readonly baseUrl = `${environment.apiBaseUrl}/water/api/alertes-eau`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<AlerteEau[]> {
    return this.http.get<AlerteEau[]>(this.baseUrl);
  }

  updateStatut(id: number, value: string): Observable<AlerteEau> {
    const params = new HttpParams().set('value', value);
    return this.http.put<AlerteEau>(`${this.baseUrl}/${id}/statut`, null, { params });
  }
}
