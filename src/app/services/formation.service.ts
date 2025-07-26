import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../shared/models/formation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = `${environment.apiUrl}/api/public`;

  constructor(private http: HttpClient) {}

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/formations`);
  }

  getFormationsAuth(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${environment.apiUrl}/api/formations/public`);
  }

  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}/formations/${id}`);
  }

  getFormationsByCategory(category: string): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/formations/categorie/${encodeURIComponent(category)}`);
  }

  searchFormations(query: string): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/formations/search`, {
      params: { query }
    });
  }
  getUserFormations(): Observable<Formation[]> {
  return this.http.get<Formation[]>(`${this.apiUrl}/user/formations`);
}
}