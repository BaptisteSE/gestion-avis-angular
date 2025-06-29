import { Component, input, output, signal, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-filtre-recherche',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './filtre-recherche.component.html',
  styleUrl: './filtre-recherche.component.css'
})
export class FiltreRechercheComponent {
  // Input signals
  placeholder = input<string>('Rechercher...');
  nombreResultats = input<number>(0);

  // Output signal
  rechercheChange = output<string>();

  // Model signal pour la valeur de recherche
  termeRecherche = model<string>('');

  // Méthode pour émettre les changements
  onRechercheChange() {
    this.rechercheChange.emit(this.termeRecherche());
  }
}
