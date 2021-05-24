import { Component, OnInit } from '@angular/core';

type User = {
  nombre: string;
  apellido: string;
};

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  autor: User = {
    nombre: "Matias",
    apellido: "Flores",
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
