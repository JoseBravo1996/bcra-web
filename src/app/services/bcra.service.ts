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

  private inflacionInteranualOficial: Inflacion[] = [];
  private inflacionMensualOficial: Inflacion[] = [];
  private inflacionInteranualEsperadaOficial: Inflacion[] = [];
  private cotizacionUSD: Inflacion[] = [];
  private cotizacionUSDOf: Inflacion[] = [];
  private baseMonetaria: Inflacion[] = [];

  constructor(private http: HttpClient) { }

  public getinflacionInteranualOficial() {
    let url_ = URL + 'inflacion_interanual_oficial';
    this.http.get<Inflacion[]>(url_).subscribe(res => this.inflacionInteranualOficial = res);
  };

  public getInflacionMensualOficial() {
    let url_ = URL + 'inflacion_mensual_oficial';
    this.http.get<Inflacion[]>(url_).subscribe(res => this.inflacionMensualOficial = res);
  }

  public getInflacionMensualEsperadaOficial() {
    let url_ = URL + 'inflacion_esperada_oficial';
    this.http.get<Inflacion[]>(url_).subscribe(res => this.inflacionInteranualEsperadaOficial = res);
  }

  public getCotizacionUSD() {
    let url_ = URL + 'usd';
    this.http.get<Inflacion[]>(url_).subscribe(res => this.cotizacionUSD = res);
  }

  public getCotizacionUSDOf() {
    let url_ = URL + 'usd_of';
    this.http.get<Inflacion[]>(url_).subscribe(res => this.cotizacionUSDOf = res);
  }

  public getBaseMonetaria() {
    let url_ = URL + 'base';
    return this.http.get<Inflacion[]>(url_);
  }

  public buscarinflacionInteranualOficial = () => this.inflacionInteranualOficial;
  public buscarinflacionMensualOficial = () => this.inflacionMensualOficial;
  public buscarinflacionInteranualEsperadaOficial = () => this.inflacionInteranualEsperadaOficial;
  public buscarcotizacionUSD = () => this.cotizacionUSD;
  public buscarcotizacionUSDOf = () => this.cotizacionUSDOf;
  public buscarBaseMonetaria = () => this.baseMonetaria;
}
