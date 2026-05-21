import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgStyle } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonBackButton
} from '@ionic/angular/standalone';

export interface Carta {
  id: number;
  emoji: string;
  volteada: boolean;
  emparejada: boolean;
}

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
  standalone: true,
  imports: [CommonModule, NgStyle, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton],
})
export class JuegoPage implements OnInit, OnDestroy {
  dificultad: string = 'facil';
  cartas: Carta[] = [];
  movimientos: number = 0;
  parejasEncontradas: number = 0;
  totalParejas: number = 0;
  columnas: number = 4;
  tiempoSegundos: number = 0;
  tiempoFormateado: string = '0:00';
  progreso: number = 0;
  private intervalo: any;
  private cartasVolteadas: number[] = [];
  private bloqueado: boolean = false;

  private emojis = ['🍎','🍇','🍌','🍉','🍓','🍍','🍑','🍒','🥝','🍋'];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      this.dificultad = nav.extras.state['dificultad'] || 'facil';
    }
  }

  ngOnInit() {
    this.iniciarJuego();
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  iniciarJuego() {
    clearInterval(this.intervalo);
    this.movimientos = 0;
    this.parejasEncontradas = 0;
    this.tiempoSegundos = 0;
    this.tiempoFormateado = '0:00';
    this.cartasVolteadas = [];
    this.bloqueado = false;

    let numParejas = 6;
    this.columnas = 4;
    if (this.dificultad === 'medio') { numParejas = 8; this.columnas = 4; }
    if (this.dificultad === 'dificil') { numParejas = 10; this.columnas = 5; }
    this.totalParejas = numParejas;

    const emojisSeleccionados = this.emojis.slice(0, numParejas);
    const dobles = [...emojisSeleccionados, ...emojisSeleccionados];
    const mezclado = dobles.sort(() => Math.random() - 0.5);

    this.cartas = mezclado.map((emoji, index) => ({
      id: index,
      emoji,
      volteada: false,
      emparejada: false,
    }));

    this.intervalo = setInterval(() => {
      this.tiempoSegundos++;
      const min = Math.floor(this.tiempoSegundos / 60);
      const seg = this.tiempoSegundos % 60;
      this.tiempoFormateado = `${min}:${seg.toString().padStart(2, '0')}`;
    }, 1000);
  }

  voltearCarta(index: number) {
    const carta = this.cartas[index];
    if (this.bloqueado || carta.volteada || carta.emparejada) return;

    carta.volteada = true;
    this.cartasVolteadas.push(index);

    if (this.cartasVolteadas.length === 2) {
      this.movimientos++;
      this.bloqueado = true;
      const [i1, i2] = this.cartasVolteadas;

      if (this.cartas[i1].emoji === this.cartas[i2].emoji) {
        this.cartas[i1].emparejada = true;
        this.cartas[i2].emparejada = true;
        this.parejasEncontradas++;
        this.progreso = Math.round((this.parejasEncontradas / this.totalParejas) * 100);
        this.cartasVolteadas = [];
        this.bloqueado = false;

        if (this.parejasEncontradas === this.totalParejas) {
          clearInterval(this.intervalo);
          setTimeout(() => {
            this.router.navigate(['/victoria'], {
              state: {
                movimientos: this.movimientos,
                tiempo: this.tiempoFormateado,
                dificultad: this.dificultad
              }
            });
          }, 600);
        }
      } else {
        setTimeout(() => {
          this.cartas[i1].volteada = false;
          this.cartas[i2].volteada = false;
          this.cartasVolteadas = [];
          this.bloqueado = false;
        }, 900);
      }
    }
  }

  reiniciar() {
    this.iniciarJuego();
  }
}
