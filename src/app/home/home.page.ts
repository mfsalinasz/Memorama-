import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent],
})
export class HomePage {
  constructor(private router: Router) {}

  irADificultad() {
    this.router.navigate(['/dificultad']);
  }

  verMejoresTiempos() {
    alert('Aún no hay tiempos guardados.');
  }
}
