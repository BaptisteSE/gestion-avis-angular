import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Avis {
  id: number;
  titre: string;
  description: string;
  auteur: string;
  date: Date;
  statut: 'ouvert' | 'ferme';
  note: number;
  icone?: string; // Icône Material pour l'avis
}

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  // Signals pour les données d'avis
  private _avisOuverts = signal<Avis[]>([]);
  private _avisFermes = signal<Avis[]>([]);

  // Signals pour les filtres
  private _filtreOuverts = signal<string>('');
  private _filtreFermes = signal<string>('');

  // Computed signals pour les avis filtrés
  readonly avisOuvertsFiltres = computed(() =>
    this.filtrerAvis(this._avisOuverts(), this._filtreOuverts())
  );

  readonly avisFermesFiltres = computed(() =>
    this.filtrerAvis(this._avisFermes(), this._filtreFermes())
  );

  // Getters pour les données brutes
  get avisOuverts() { return this._avisOuverts(); }
  get avisFermes() { return this._avisFermes(); }
  get filtreOuverts() { return this._filtreOuverts(); }
  get filtreFermes() { return this._filtreFermes(); }

  constructor() {
    this.chargerDonneesSimulees();
  }

  // Méthodes pour mettre à jour les filtres
  setFiltreOuverts(terme: string) {
    this._filtreOuverts.set(terme);
  }

  setFiltreFermes(terme: string) {
    this._filtreFermes.set(terme);
  }

  // Méthodes pour récupérer les données (pour compatibilité)
  getAvisOuverts(): Observable<Avis[]> {
    return of(this._avisOuverts());
  }

  getAvisFermes(): Observable<Avis[]> {
    return of(this._avisFermes());
  }

  private chargerDonneesSimulees() {
    // Simuler des données d'avis ouverts
    const avisOuverts: Avis[] = [
      {
        id: 1,
        titre: 'Excellent service client',
        description: 'Le service client a été très réactif et professionnel.',
        auteur: 'Jean Dupont',
        date: new Date('2024-06-25'),
        statut: 'ouvert',
        note: 5,
        icone: 'support_agent'
      },
      {
        id: 2,
        titre: 'Produit de qualité',
        description: 'Très satisfait de la qualité du produit reçu.',
        auteur: 'Marie Martin',
        date: new Date('2024-06-24'),
        statut: 'ouvert',
        note: 4,
        icone: 'star'
      },
      {
        id: 3,
        titre: 'Livraison rapide',
        description: 'Livraison effectuée dans les délais annoncés.',
        auteur: 'Pierre Durand',
        date: new Date('2024-06-23'),
        statut: 'ouvert',
        note: 5,
        icone: 'local_shipping'
      },
      {
        id: 4,
        titre: 'Interface utilisateur intuitive',
        description: 'L\'interface est très facile à utiliser.',
        auteur: 'Sophie Bernard',
        date: new Date('2024-06-22'),
        statut: 'ouvert',
        note: 4,
        icone: 'touch_app'
      }
    ];

    // Simuler des données d'avis fermés
    const avisFermes: Avis[] = [
      {
        id: 5,
        titre: 'Problème résolu',
        description: 'Le problème a été résolu rapidement par l\'équipe.',
        auteur: 'Lucas Moreau',
        date: new Date('2024-06-20'),
        statut: 'ferme',
        note: 4,
        icone: 'check_circle'
      },
      {
        id: 6,
        titre: 'Réclamation traitée',
        description: 'Ma réclamation a été traitée avec succès.',
        auteur: 'Emma Roux',
        date: new Date('2024-06-18'),
        statut: 'ferme',
        note: 3,
        icone: 'assignment_turned_in'
      },
      {
        id: 7,
        titre: 'Demande d\'information',
        description: 'J\'ai reçu toutes les informations demandées.',
        auteur: 'Thomas Leroy',
        date: new Date('2024-06-15'),
        statut: 'ferme',
        note: 5,
        icone: 'info'
      },
      {
        id: 8,
        titre: 'Suggestion implémentée',
        description: 'Ma suggestion a été prise en compte et implémentée.',
        auteur: 'Julie Petit',
        date: new Date('2024-06-12'),
        statut: 'ferme',
        note: 5,
        icone: 'lightbulb'
      }
    ];

    this._avisOuverts.set(avisOuverts);
    this._avisFermes.set(avisFermes);
  }

  private filtrerAvis(avis: Avis[], terme: string): Avis[] {
    if (!terme.trim()) {
      return avis;
    }

    const termeLower = terme.toLowerCase();
    return avis.filter(avis =>
      avis.titre.toLowerCase().includes(termeLower) ||
      avis.description.toLowerCase().includes(termeLower) ||
      avis.auteur.toLowerCase().includes(termeLower)
    );
  }
}
