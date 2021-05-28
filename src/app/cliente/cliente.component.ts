import { Component, OnInit } from '@angular/core';
import { Cliente } from './interfaces/cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
     this.clienteService.getClientes().subscribe( clientes => this.clientes = clientes);
  }

  remove(cliente: Cliente){
    Swal.fire({
      title: 'Estas seguro?',
      text: `Estas eliminando al cliente ${cliente.nombre}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SI, borralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.remove(<number>cliente.id).subscribe(
          resp => this.clientes = this.clientes.filter(item => item != cliente)
        );
        Swal.fire(
          'Eliminado!',
          `El cliente ${cliente.nombre}`,
          'success'
        )
      }
    })
  }
}
