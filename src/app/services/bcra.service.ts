import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inflacion } from '../models/inflacion';

const URL = 'https://api.estadisticasbcra.com/';

@Injectable({
  providedIn: 'root'
})
export class BcraService {

  constructor(private http: HttpClient) { }

  public getinflacionInteranualOficial(): Observable<Inflacion[]> {
    let url_ = URL + 'inflacion_interanual_oficial';
    return this.http.get<Inflacion[]>(url_).pipe(map(res => {
      return res.filter((item: any) =>
        new Date(item.d) >= new Date('2010-01-01') && new Date(item.d) <= new Date()
      );
    }));
  }

  public getInflacionMensualOficial(): Observable<Inflacion[]> {
    let url_ = URL + 'inflacion_mensual_oficial';
    return this.http.get<Inflacion[]>(url_).pipe(map(res => {
      return res.filter((item: any) =>
        new Date(item.d) >= new Date('2021-01-01')
      );
    }));
  }

  public getBaseMonetaria(): Observable<Inflacion> {
    let url_ = URL + 'base';
    let baseMonetaria;
    return this.http.get<Inflacion[]>(url_).pipe(map(res => {
      baseMonetaria = res[res.length - 1];
      return baseMonetaria;
    }));
  }

  public getReservas(): Observable<Inflacion> {
    let reserva;
    let url_ = URL + 'reservas';
    return this.http.get<Inflacion[]>(url_).pipe(map(res => {
      reserva = res[res.length - 1];
      return reserva;
    }));
  }

  public getBaseMonetariaInteranual(): Observable<Inflacion> {
    let reserva;
    let url_ = URL + 'var_base_monetaria_interanual';
    return this.http.get<Inflacion[]>(url_).pipe(map(res => {
      reserva = res[res.length - 1];
      return reserva;
    }));
  }
}
