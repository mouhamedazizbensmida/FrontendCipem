import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormationService } from '../../../services/formation.service';
import { Formation, Module } from '../../../shared/models/formation.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-formation-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule,
    DatePipe
  ],
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})
export class FormationDetailsComponent {
  formation: Formation = {
    id: 0,
    titre: '',
    description: '',
    imageUrl: null,
    dureeHeures: 0,
    categorie: '',
    type: 'En ligne',
    active: true,
    dateCreation: null,
    dateModification: null
  };

  relatedFormations: Formation[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFormation(+id);
    }
  }

  loadFormation(id: number) {
    this.isLoading = true;
    this.error = null;
    
    this.formationService.getFormationById(id).subscribe({
      next: (formation) => {
        this.formation = {
          ...this.formation,
          ...formation,
          // Initialiser les tableaux si non définis
          modules: formation.modules || []
        };
        this.loadRelatedFormations(this.formation.categorie);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading formation:', err);
        this.error = this.translate.instant('FORMATION_DETAILS.LOAD_ERROR');
        this.isLoading = false;
      }
    });
  }

  loadRelatedFormations(category: string) {
    this.formationService.getFormationsByCategory(category).subscribe({
      next: (formations) => {
        this.relatedFormations = formations
          .filter(f => f.id !== this.formation?.id)
          .slice(0, 3);
      },
      error: (err) => console.error('Error loading related formations:', err)
    });
  }

  openRegistrationModal() {
    // Implémentation de la modal d'inscription
    console.log('Ouverture de la modal d\'inscription pour la formation', this.formation.id);
  }
}