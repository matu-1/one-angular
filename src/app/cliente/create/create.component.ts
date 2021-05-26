import { Component, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  title: string = 'Nuevo cliente';
  cliente: Cliente = {};

  constructor(
    private clieteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id)
        this.clieteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
    });
  }

  handleSubmit() {
    console.log(this.cliente);
    if (this.cliente.id) this.update();
    else this.create();
  }

  create() {
    console.log("se llamo crear");
    this.clieteService.create(this.cliente).subscribe((resp) => {
      Swal.fire(
        'Nuevo',
        `El cliente ${resp.nombre} se creo correctamente!`,
        'success'
      );
      this.router.navigate(['/cliente']);
    });
  }

  update() {
    this.clieteService.update(this.cliente).subscribe((resp) => {
      Swal.fire(
        'Actualizar',
        `El cliente ${resp.nombre} se actualizo correctamente!`,
        'success'
      );
      this.router.navigate(['/cliente']);
    });
  }
}
