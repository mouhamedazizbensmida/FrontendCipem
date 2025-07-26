import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  teamMembers = [
    { 
      nameKey: 'ABOUT.TEAM_MEMBER_1_NAME',
      roleKey: 'ABOUT.TEAM_MEMBER_1_ROLE',
      image: 'assets/images/team/marc.jpg',
      descKey: 'ABOUT.TEAM_MEMBER_1_DESC'
    },
    { 
      nameKey: 'ABOUT.TEAM_MEMBER_2_NAME',
      roleKey: 'ABOUT.TEAM_MEMBER_2_ROLE',
      image: 'assets/images/team/marc.jpg',
      descKey: 'ABOUT.TEAM_MEMBER_2_DESC'
    },
    { 
      nameKey: 'ABOUT.TEAM_MEMBER_3_NAME',
      roleKey: 'ABOUT.TEAM_MEMBER_3_ROLE',
      image: 'assets/images/team/marc.jpg',
      descKey: 'ABOUT.TEAM_MEMBER_3_DESC'
    }
  ];

  constructor(public translate: TranslateService) {}
}