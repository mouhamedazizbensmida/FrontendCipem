import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyComponent implements OnInit {
  isLoading = true;
  isSuccess = false;
  isError = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      
      if (!token) {
        this.handleError('Token de vérification manquant');
        return;
      }

      this.verifyEmail(token);
    });
  }

verifyEmail(token: string): void {
  this.authService.verifyEmail(token).subscribe({
    next: () => {
      this.isLoading = false;
      this.isSuccess = true;
      this.snackBar.open('Email vérifié avec succès!', 'Fermer', { duration: 5000 });
    },
    error: (err) => {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = err.message;
      this.snackBar.open(err.message, 'Fermer', { duration: 5000 });
    }
  });
}

  private handleError(message: string): void {
    this.isLoading = false;
    this.isError = true;
    this.errorMessage = message;
    this.snackBar.open(message, 'Fermer', { duration: 5000 });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}