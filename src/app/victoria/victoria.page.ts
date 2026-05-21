import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-victoria',
  templateUrl: './victoria.page.html',
  styleUrls: ['./victoria.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class VictoriaPage implements OnInit {
  movimientos: number = 0;
  tiempo: string = '0:00';
  dificultad: string = 'facil';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      this.movimientos = nav.extras.state['movimientos'] || 0;
      this.tiempo = nav.extras.state['tiempo'] || '0:00';
      this.dificultad = nav.extras.state['dificultad'] || 'facil';
    }
  }

  ngOnInit() {}

  jugarOtraVez() {
    this.router.navigate(['/dificultad']);
  }

  irAlMenu() {
    this.router.navigate(['/home']);
  }
}
