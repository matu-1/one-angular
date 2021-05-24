import { Injectable } from '@angular/core';
import { Cliente } from './interfaces/cliente';
import clientesJson from './clientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClienteService {
  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return of(clientesJson);
  }
}
