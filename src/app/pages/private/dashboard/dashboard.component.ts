import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Formation } from '../../../shared/models/formation.model';
import { AuthService } from '../../../core/services/auth.service';
import { FormationService } from '../../../services/formation.service';
import { SidebarComponent } from '../Sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTooltipModule,
    SidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoading = true;
  user: any;
  formations: Formation[] = [];
  recentActivities: any[] = [];
  recommendations: any[] = [];
  progressValue = 0;
  completedFormationsCount = 0;
  sidebarCollapsed = true;
  isMobile = false;

  constructor(
    private authService: AuthService,
    private formationService: FormationService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    this.loadUserData();
    this.loadFormations();
    this.generateSampleData();
  }

  private checkIfMobile(): void {
    this.isMobile = window.innerWidth < 992;
    if (this.isMobile) {
      this.sidebarCollapsed = true; 
    }
  }

  private loadUserData(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  private loadFormations(): void {
    this.formationService.getFormationsAuth().subscribe({
      next: (formations: Formation[]) => {
        this.formations = formations.map(formation => ({
          ...formation,
          progress: Math.floor(Math.random() * 100)
        }));
        
        this.calculateProgress();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading formations:', err);
        this.isLoading = false;
      }
    });
  }

  private calculateProgress(): void {
    if (this.formations.length === 0) {
      this.progressValue = 0;
      return;
    }
    
    const totalProgress = this.formations.reduce((sum, formation) => sum + (formation.progress || 0), 0);
    this.progressValue = Math.round(totalProgress / this.formations.length);
    this.completedFormationsCount = this.formations.filter(f => f.progress === 100).length;
  }

  private generateSampleData(): void {
    this.recentActivities = [
      { icon: 'play_circle', title: 'Formation Angular démarrée', date: new Date(), time: '10:30' },
      { icon: 'assignment_turned_in', title: 'Quiz React terminé', date: new Date(Date.now() - 86400000), time: 'Hier' },
      { icon: 'video_library', title: 'Vidéo Node.js vue', date: new Date(Date.now() - 172800000), time: 'Il y a 2 jours' }
    ];

    this.recommendations = [
      { 
        title: 'Angular Avancé', 
        description: 'Maîtrisez les concepts avancés d\'Angular', 
        link: ['/formations', 1] 
      },
      { 
        title: 'Architecture Microservices', 
        description: 'Apprenez à concevoir des systèmes distribués', 
        link: ['/formations', 2] 
      }
    ];
  }


  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  viewAllFormations(): void {
    // Navigation vers la page des formations
  }

  logout(): void {
    this.authService.logout();
  }
  closeSidebarOnMobile(): void {
    if (this.isMobile) {
      this.sidebarCollapsed = true;
    }
  }
closeSidebarOnClickOutside(event: MouseEvent): void {
  if (!this.sidebarCollapsed && this.isMobile) {
    const sidebar = document.querySelector('app-sidebar');
    const toggleButton = document.querySelector('.menu-toggle');
    
    if (!sidebar?.contains(event.target as Node) && 
        !toggleButton?.contains(event.target as Node)) {
      this.sidebarCollapsed = true;
    }
  }
}
}