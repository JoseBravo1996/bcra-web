import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Inflacion } from 'src/app/models/inflacion';
import { BcraService } from '../../services/bcra.service';

@Component({
  selector: 'app-dolar',
  templateUrl: './dolar.component.html',
  styleUrls: ['./dolar.component.scss']
})
export class DolarComponent implements OnInit {

  getCotizacionUSD: Inflacion;
  getCotizacionUSDOf: Inflacion;
  getCotizacionUSDList: Inflacion[] = [];
  getCotizacionUSDOfList: Inflacion[] = [];
  getCotizacionUSDListOneYear: Inflacion[] = [];
  getCotizacionUSDOfListOneYear: Inflacion[] = [];

  chartCotizacionUSD: any = [];
  chartCotizacionUSDOf: any = [];
  chartCotizacionUSDvsUSDOf: any = [];

  fechaDelDia: Date = new Date();

  constructor(private bcraService: BcraService) {
    Chart.register(...registerables);
    this.fechaDelDia.setDate(this.fechaDelDia.getDate() - 1)
    this.bcraService.getCotizacionUSD();
    this.bcraService.getCotizacionUSDOf();
  }

  ngOnInit(): void {
    this.cotizacionUSDActual();
    this.cotizacionUSDOfActual();
    this.cotizacionUSDActualList();
    this.cotizacionUSDOfActualList();
    this.cotizacionUSDvsUSDOfList();
  }

  public cotizacionUSDActual() {
    this.getCotizacionUSD = this.bcraService.buscarcotizacionUSD().find((item: any) => new Date(item.d) >= new Date('2022-07-14')
    );
  }

  public cotizacionUSDOfActual() {
    this.getCotizacionUSDOf = this.bcraService.buscarcotizacionUSDOf().find((item: any) => new Date(item.d) >= new Date('2022-07-14')
    );
  }

  public cotizacionUSDActualList() {
    this.getCotizacionUSDList = this.bcraService.buscarcotizacionUSD().filter((item: any) => new Date(item.d) >= new Date('2022-01-01'));

    let char = this.getCotizacionUSDList.map(base => ({ x: base.d, y: base.v }));

    this.chartCotizacionUSD = new Chart('canvasUSD', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Cotizacion USD BLUE',
            borderColor: '#1018BD',
            borderWidth: 1,
            data: char,
            tension: 0.5
          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          xAxis: {
            display: false
          }
        }
      }
    });
  }

  public cotizacionUSDOfActualList() {
    this.getCotizacionUSDOfList = this.bcraService.buscarcotizacionUSDOf().filter((item: any) => new Date(item.d) >= new Date('2022-01-01'));

    let char = this.getCotizacionUSDOfList.map(base => ({ x: base.d, y: base.v }));

    this.chartCotizacionUSDOf = new Chart('canvasUSDOf', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Cotizacion USD BNA',
            borderColor: '#06F34B',
            borderWidth: 1,
            data: char,
            tension: 0.5
          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          xAxis: {
            display: false
          }
        }
      }
    });
  }

  public cotizacionUSDvsUSDOfList() {
    let char = this.bcraService.buscarcotizacionUSDOf().filter((item: any) =>
      new Date(item.d) >= new Date('2022-01-01')
    ).map(base => ({ x: base.d, y: base.v }));;

    let char2 = this.bcraService.buscarcotizacionUSD().filter((item: any) =>
      new Date(item.d) >= new Date('2022-01-01')
    ).map(base => ({ x: base.d, y: base.v }));;

    this.chartCotizacionUSDOf = new Chart('canvasUSDOfvsUSD', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Cotizacion USD BNA',
            borderColor: '#06F34B',
            borderWidth: 1,
            data: char,
            tension: 0.5
          },
          {
            label: 'Cotizacion USD BLUE',
            borderColor: '#0615F3',
            borderWidth: 1,
            data: char2,
            tension: 0.5
          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          xAxis: {
            display: false
          }
        }
      }
    });
  }

  filterData(datos: Inflacion[]) {
    return datos.map(res => res).map(res => res.v);
  }

}
