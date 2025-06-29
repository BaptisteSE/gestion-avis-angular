// Types centralisés pour le module avis
export interface Avis {
  id: number;
  titre: string;
  description: string;
  auteur: string;
  date: Date;
  statut: 'ouvert' | 'ferme';
  note: number;
  icone?: string;
}

export type StatutAvis = 'ouvert' | 'ferme';
