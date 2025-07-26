import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicTitleService } from './core/services/title.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private titleService: DynamicTitleService) {}

  ngOnInit() {
    this.titleService.init();
  }
}
