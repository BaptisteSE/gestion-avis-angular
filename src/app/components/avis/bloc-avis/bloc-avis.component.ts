import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { AvisItemComponent } from '../avis-item/avis-item.component';
import { FiltreRechercheComponent } from '../filtre-recherche/filtre-recherche.component';
import { Avis } from '../services/avis.service';

@Component({
  selector: 'app-bloc-avis',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    AvisItemComponent,
    FiltreRechercheComponent
  ],
  templateUrl: './bloc-avis.component.html',
  styleUrl: './bloc-avis.component.css'
})
export class BlocAvisComponent {
  // Input signals
  titre = input.required<string>();
  statut = input<'ouvert' | 'ferme'>('ouvert');
  avis = input.required<Avis[]>();
  avisFiltres = input.required<Avis[]>();
  deplie = input<boolean>(false);
  placeholder = input<string>('Rechercher...');

  // Output signals
  toggleDeplie = output<void>();
  rechercheChange = output<string>();

  // Computed signals pour les données dérivées
  readonly nombreAvis = computed(() => this.avis().length);
  readonly nombreResultats = computed(() => this.avisFiltres().length);
  readonly statutTexte = computed(() =>
    this.statut() === 'ouvert' ? 'Ouvert' : 'Fermé'
  );
  readonly messageAucunResultat = computed(() =>
    `Aucun avis ${this.statut() === 'ouvert' ? 'ouvert' : 'fermé'} trouvé.`
  );
  readonly statutIcon = computed(() =>
    this.statut() === 'ouvert' ? 'pending' : 'check_circle'
  );
  readonly statutColor = computed(() =>
    this.statut() === 'ouvert' ? 'accent' : 'primary'
  );

  onToggleDeplie() {
    this.toggleDeplie.emit();
  }

  onRechercheChange(terme: string) {
    this.rechercheChange.emit(terme);
  }
}
