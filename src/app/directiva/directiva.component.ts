import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {
  cursos: string[] = ["Javascrip", "Typescript", "PHP", "Java"];
  showCursos = true;
}
