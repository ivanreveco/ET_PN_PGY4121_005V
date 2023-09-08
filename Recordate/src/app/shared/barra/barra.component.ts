import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
})
export class BarraComponent  implements OnInit {

  nombre: string = '';


  constructor() { }

  ngOnInit() {
    const userString= localStorage.getItem('user');
    if(userString!==null){
      const user= JSON.parse(userString);
      this.nombre=user.nombre;
    }
  }
}
