import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expert-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expert-card.component.html',
  styleUrls: ['./expert-card.component.scss']
})
export class ExpertCardComponent {
  @Input() expert: any;
}