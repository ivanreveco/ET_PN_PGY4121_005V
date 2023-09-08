import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
})
export class BarraComponent  implements OnInit {

  nombre: string = '';
  nombreMostrado: string = '';

  constructor() { }

  ngOnInit() {}

  guardarNombre() {
    if (this.nombre.trim() !== '') {
        localStorage.setItem('nombre', this.nombre);
        // Puedes mostrar un mensaje de éxito aquí si lo deseas
        console.log('Nombre guardado en localStorage.');
      }
    
    }

    obtenerNombre() {
      try {
        const nombreGuardado = localStorage.getItem('nombre');
        if (nombreGuardado) {
          this.nombreMostrado = nombreGuardado; // Asigna el valor a nombreMostrado
          console.log('Nombre obtenido de localStorage:', nombreGuardado);
        } else {
          console.log('El nombre no se ha guardado previamente.');
        }
      } catch (error) {
        console.error('Error al obtener el nombre:', error);
      }
    }


}
