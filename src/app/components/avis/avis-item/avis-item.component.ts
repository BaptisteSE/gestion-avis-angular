import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Avis } from '../services/avis.service';

@Component({
  selector: 'app-avis-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './avis-item.component.html',
  styleUrl: './avis-item.component.css'
})
export class AvisItemComponent {
  // Input signal pour l'avis
  avis = input.required<Avis>();

  // Computed signals pour les données dérivées
  readonly etoiles = computed(() => this.getEtoiles(this.avis().note));
  readonly dateFormatee = computed(() => this.formaterDate(this.avis().date));
  readonly statutTexte = computed(() =>
    this.avis().statut === 'ouvert' ? 'En cours' : 'Terminé'
  );
  readonly statutColor = computed(() =>
    this.avis().statut === 'ouvert' ? 'accent' : 'primary'
  );

  private getEtoiles(note: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < note ? '★' : '☆');
  }

  private formaterDate(date: Date): string {
    return date.toLocaleDateString('fr-FR');
  }
}
