import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<void>();
  @Output() closeSidebar = new EventEmitter<void>();
  private isMouseInside = false;

  menuItems = [
    { title: 'Tableau de bord', icon: 'dashboard', link: '/dashboard' },
    { title: 'Mes Formations', icon: 'school', link: '/formations' },
    { title: 'Calendrier', icon: 'calendar_today', link: '/calendar' },
    { title: 'Progression', icon: 'trending_up', link: '/progress' },
    { title: 'Messages', icon: 'mail', link: '/messages' },
    { title: 'Paramètres', icon: 'settings', link: '/settings' }
  ];

  @HostListener('mouseenter')
  onSidebarEnter() {
    this.isMouseInside = true;
    if (!this.isMobile() && this.collapsed) {
      this.toggleCollapse.emit();
    }
  }

  @HostListener('mouseleave')
  onSidebarLeave() {
    this.isMouseInside = false;
    setTimeout(() => {
      if (!this.isMouseInside && !this.isMobile() && !this.collapsed) {
        this.toggleCollapse.emit();
      }
    }, 300); // Petit délai pour éviter les fermetures intempestives
  }

  onItemMouseEnter(): void {
    this.isMouseInside = true;
  }

  isMobile(): boolean {
    return window.innerWidth < 992;
  }
}