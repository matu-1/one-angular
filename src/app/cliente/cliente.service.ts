import { Injectable } from '@angular/core';
import { Cliente } from './interfaces/cliente.interface';
import clientesJson from './clientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClienteService {
  private url: string = 'http://localhost:8081/cliente';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    // return of(clientesJson);
    return this.http.get<Cliente[]>(this.url);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente, { headers: this.headers });
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/${cliente.id}`, cliente, { headers: this.headers });
  }
}
