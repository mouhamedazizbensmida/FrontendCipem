import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { FormationService } from '../../../services/formation.service';
import { Formation } from '../../../shared/models/formation.model';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    TruncatePipe
  ],
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationsComponent {
  formations: Formation[] = [];
  filteredFormations: Formation[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  isLoading = true;
  error: string | null = null;

  constructor(
    private formationService: FormationService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadFormations();
  }

  loadFormations() {
    this.isLoading = true;
    this.error = null;

    this.formationService.getFormations().subscribe({
      next: (data) => {
        this.formations = data;
        this.filteredFormations = data;
        this.categories = [...new Set(data.map(f => f.categorie))];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading formations:', err);
        this.error = this.translate.instant('FORMATIONS.LOAD_ERROR');
        this.isLoading = false;
      }
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filteredFormations = category
      ? this.formations.filter(f => f.categorie === category)
      : this.formations;
  }
}