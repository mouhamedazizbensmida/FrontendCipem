import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class HeaderComponent {
  isLoggedIn = false;
  showMenu = false;
  currentLanguage = 'fr';
  isAuthenticated: boolean = false;
  currentUser: any;

  constructor(private translate: TranslateService,private authService: AuthService) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  }


  logout(): void {
    this.authService.logout();
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'fr' ? 'en' : 'fr';
    this.translate.use(this.currentLanguage);
  }

  getLanguageText(): string {
    return this.currentLanguage === 'fr' ? 'FRA' : 'ENG';
  }
  getLanguageFlag(): string {
  const lang = this.translate.currentLang || 'fr'; 
  return `assets/images/flags/${lang}.png`;
}

}