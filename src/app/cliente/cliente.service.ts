import { Injectable } from '@angular/core';
import { Cliente } from './interfaces/cliente';
// import clientesJson from './clientes.json';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { BaseResponse } from './interfaces/BaseResponse';

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
    return this.http.get(`${this.url}/${id}`).pipe(
      map((res: any) => res.data),
      catchError((e) => {
        console.log(e);
        Swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  create(cliente: Cliente): Observable<BaseResponse<Cliente>> {
    return this.http
      .post<BaseResponse<Cliente>>(this.url, cliente, {
        headers: this.headers,
      })
      .pipe(
        catchError((e) => {
          console.log(e);
          Swal.fire('Error al crear', e.error.message, 'error');
          return throwError(e);
        })
      );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put(`${this.url}/${cliente.id}`, cliente, {
        headers: this.headers,
      })
      .pipe(
        map((res: any) => res.data),
        catchError((e) => {
          Swal.fire('Error al actualizar', e.error.message, 'error');
          return throwError(e);
        })
      );
  }

  remove(id: number): Observable<void> {
    return this.http
      .delete(`${this.url}/${id}`, {
        headers: this.headers,
      })
      .pipe(
        map((res: any) => res.data),
        catchError((e) => {
          Swal.fire('Error al borrar', e.error.message, 'error');
          return throwError(e);
        })
      );
  }
}
