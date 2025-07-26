export interface Formation {
  id: number;
  titre: string;
  description: string;
  imageUrl: string | null;
  dureeHeures: number;
  categorie: string;
  type: string;
  active: boolean;
  dateCreation: string | null;
  dateModification: string | null;
  prix?: number;
  certification?: boolean;
  niveauDifficulte?: string;
  dateDebut?: string;
  completed?: boolean;
  progress?: number;
  formateur?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    photoUrl?: string;
    rating?: number;
  };
  modules?: Module[];
}

export interface Module {
  id: number;
  titre: string;
  description: string;
  contenuImageUrl: string | null;
  ordre: number;
  actif: boolean;
  dateCreation: string | null;
}