import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyComponent } from './verify-email/verify-email.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Connexion - CIPEM'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Inscription - CIPEM'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Mot de passe oublié - CIPEM'
    }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      title: 'Réinitialisation mot de passe - CIPEM'
    }
  },
  {
    path: 'verify-email',
    component: VerifyComponent,
    data: {
      title: 'Vérification email - CIPEM'
    }
  }
];