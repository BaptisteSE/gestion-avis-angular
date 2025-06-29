import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BlocAvisComponent } from './bloc-avis/bloc-avis.component';
import { AvisService } from './services/avis.service';

@Component({
  selector: 'app-avis',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    BlocAvisComponent
  ],
  templateUrl: './avis.component.html',
  styleUrl: './avis.component.css'
})
export class AvisComponent {
  // Injection du service
  private avisService = inject(AvisService);

  // Signals pour l'état des blocs
  private _blocOuvertsDeplie = signal(false);
  private _blocFermesDeplie = signal(false);

  // Computed signals pour les données
  readonly avisOuverts = computed(() => this.avisService.avisOuverts);
  readonly avisFermes = computed(() => this.avisService.avisFermes);
  readonly avisOuvertsFiltres = computed(() => this.avisService.avisOuvertsFiltres());
  readonly avisFermesFiltres = computed(() => this.avisService.avisFermesFiltres());

  // Computed signals pour l'état des blocs
  readonly blocOuvertsDeplie = computed(() => this._blocOuvertsDeplie());
  readonly blocFermesDeplie = computed(() => this._blocFermesDeplie());

  // Méthodes pour gérer l'état des blocs
  onToggleBlocOuverts() {
    this._blocOuvertsDeplie.update(deplie => !deplie);
  }

  onToggleBlocFermes() {
    this._blocFermesDeplie.update(deplie => !deplie);
  }

  // Méthodes pour gérer les filtres
  onRechercheOuverts(terme: string) {
    this.avisService.setFiltreOuverts(terme);
  }

  onRechercheFermes(terme: string) {
    this.avisService.setFiltreFermes(terme);
  }
}
