import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    RouterModule,
    TranslateModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerLinks = [
    {
      title: 'FOOTER.TRAININGS',
      links: [
        { path: '/formations', label: 'FOOTER.ALL_TRAININGS' },
        { path: '/formations/categorie/management', label: 'FOOTER.MANAGEMENT' },
        { path: '/formations/categorie/marketing', label: 'FOOTER.MARKETING' },
        { path: '/formations/categorie/rh', label: 'FOOTER.HR' }
      ]
    },
    {
      title: 'FOOTER.COMPANY',
      links: [
        { path: '/a-propos', label: 'FOOTER.ABOUT' },
        { path: '/contact', label: 'FOOTER.CONTACT' },
        { path: '/mentions-legales', label: 'FOOTER.LEGAL_NOTICES' },
        { path: '/cgv', label: 'FOOTER.TERMS' }
      ]
    },
    {
      title: 'FOOTER.RESOURCES',
      links: [
        { path: '/blog', label: 'FOOTER.BLOG' },
        { path: '/faq', label: 'FOOTER.FAQ' },
        { path: '/aide', label: 'FOOTER.HELP' },
        { path: '/temoignages', label: 'FOOTER.TESTIMONIALS' }
      ]
    }
  ];

  socialLinks = [
    { icon: 'facebook', url: 'https://facebook.com' },
    { icon: 'twitter', url: 'https://twitter.com' },
    { icon: 'linkedin', url: 'https://linkedin.com' },
    { icon: 'instagram', url: 'https://instagram.com' },
    { icon: 'youtube', url: 'https://youtube.com' }
  ];

  constructor(public translate: TranslateService) {}
}