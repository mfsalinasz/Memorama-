import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dificultad',
  templateUrl: './dificultad.page.html',
  styleUrls: ['./dificultad.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class DificultadPage {
  seleccion: string = '';

  constructor(private router: Router) {}

  seleccionar(nivel: string) {
    this.seleccion = nivel;
  }

  comenzar() {
    this.router.navigate(['/juego'], { state: { dificultad: this.seleccion } });
  }

  volver() {
    this.router.navigate(['/home']);
  }
}
