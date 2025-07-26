import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http://localhost:8080/api/auth';
  private apiUrl = 'https://cipem-platform-backend.onrender.com/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUser();
  }

  private loadUser(): void {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (user && token) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

login(email: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/signin`, { email, password }).pipe(
    tap((response: any) => {
      if (response.accessToken) {
        const userData = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          photoUrl: response.photoUrl || 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
          roles: response.roles,
          token: response.accessToken
        };
        
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        this.currentUserSubject.next(userData);
        this.router.navigate(['/dashboard']);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      // Récupération directe du message du backend
      let errorMsg = error.error?.message || error.message || 'Erreur de connexion';
      return throwError(() => new Error(errorMsg));
    })
  );
}

  register(userData: any): Observable<any> {
    const payload = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      photoUrl: userData.photoUrl || 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
      role: ['user'] // Rôle par défaut
    };

    return this.http.post(`${this.apiUrl}/signup`, payload).pipe(
      tap(() => {
        this.router.navigate(['/login'], { 
          queryParams: { registered: 'true' } 
        });
      }),
      catchError(error => {
        let errorMsg = 'Erreur lors de l\'inscription';
        if (error.error?.message) {
          errorMsg = error.error.message;
        } else if (error.status === 400) {
          errorMsg = 'Données invalides';
        } else if (error.status === 409) {
          errorMsg = 'Email déjà utilisé';
        } else if (error.status === 0) {
          errorMsg = 'Impossible de se connecter au serveur';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { token, newPassword };
    
    return this.http.post(`${this.apiUrl}/reset-password`, body, { headers }).pipe(
      catchError(error => {
        let errorMsg = 'Error resetting password';
        if (error.error?.message) {
          errorMsg = error.error.message;
        } else if (error.status === 401) {
          errorMsg = 'Invalid or expired token. Please request a new password reset.';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  forgotPassword(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    return this.http.post(
      `${this.apiUrl}/forgot-password`,
      { email },
      { headers }
    ).pipe(
      catchError(error => {
        let errorMsg = 'Erreur lors de la demande';
        if (error.error?.message) {
          errorMsg = error.error.message;
        } else if (error.status === 404) {
          errorMsg = 'Email non trouvé';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

verifyEmail(token: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  return this.http.get(`${this.apiUrl}/verify-email?token=${token}`, { headers }).pipe(
    tap(() => {
      console.log('Vérification email réussie côté service');
    }),
    catchError(error => {
      let errorMsg = 'Erreur lors de la vérification';
      if (error.error?.message) {
        errorMsg = error.error.message;
      } else if (error.status === 400) {
        errorMsg = 'Token invalide';
      } else if (error.status === 410) {
        errorMsg = 'Token expiré';
      }
      return throwError(() => new Error(errorMsg));
    })
  );
}
}