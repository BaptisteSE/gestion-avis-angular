import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvisComponent } from './components/avis/avis.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AvisComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mon-projet-angular';
}
