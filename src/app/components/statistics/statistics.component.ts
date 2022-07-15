import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Inflacion } from 'src/app/models/inflacion';
import { BcraService } from 'src/app/services/bcra.service';

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  getinflacionInteranualOficial: Inflacion[] = [];
  getinflacionMensualOficial: Inflacion[] = [];
  getinflacionInteranualEsperadaOficial: Inflacion[] = [];

  chart: any = [];
  chartInflacionMensualOficial: any = [];
  chartInflacionInteranualEsperadaOficial: any = [];
  datos: Inflacion[] = [];

  constructor(private bcraService: BcraService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.interanualOfSixYear();
    this.mensualOfTwoYear();
    this.interanualEsperada();
  }

  interanualOfSixYear() {
    this.getinflacionInteranualOficial = this.bcraService.buscarinflacionInteranualOficial().filter((item: any) =>
      new Date(item.d) >= new Date('2010-01-01') && new Date(item.d) <= new Date()
    );

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.months({ count: 12 }),
        datasets: [
          {
            label: '2017',
            data: this.filterData(this.getinflacionInteranualOficial, 2017),
            borderWidth: 3,
            fill: false,
            borderColor: '#212F3D',
            tension: 0.1
          },
          {
            label: '2018',
            data: this.filterData(this.getinflacionInteranualOficial, 2018),
            borderWidth: 3,
            fill: false,
            borderColor: '#AF601A',
            tension: 0.1
          },
          {
            label: '2019',
            data: this.filterData(this.getinflacionInteranualOficial, 2019),
            borderWidth: 3,
            fill: false,
            borderColor: '#1D8348',
            tension: 0.1
          },
          {
            label: '2020',
            data: this.filterData(this.getinflacionInteranualOficial, 2020),
            borderWidth: 3,
            fill: false,
            borderColor: '#117A65',
            tension: 0.1
          },
          {
            label: '2021',
            data: this.filterData(this.getinflacionInteranualOficial, 2021),
            borderWidth: 3,
            fill: false,
            borderColor: '#27AE60',
            tension: 0.1
          },
          {
            label: '2022',
            data: this.filterData(this.getinflacionInteranualOficial, 2022),
            borderWidth: 3,
            fill: false,
            borderColor: '#A6ACAF',
            tension: 0.1
          }
        ]
      }
    });

  }

  mensualOfTwoYear() {
    this.getinflacionMensualOficial = this.bcraService.buscarinflacionMensualOficial().filter((item: any) =>
      new Date(item.d) >= new Date('2021-01-01')
    );

    this.chartInflacionMensualOficial = new Chart('canvas1', {
      type: 'line',
      data: {
        labels: this.months({ count: 12 }),
        datasets: [
          {
            label: '2021',
            data: this.filterData(this.getinflacionMensualOficial, 2021),
            borderWidth: 3,
            fill: false,
            borderColor: '#212F3D'
          },
          {
            label: '2022',
            data: this.filterData(this.getinflacionMensualOficial, 2022),
            borderWidth: 3,
            fill: false,
            borderColor: '#AF601A'
          }
        ]
      }
    });
  }

  interanualEsperada() {
    this.getinflacionInteranualEsperadaOficial = this.bcraService.buscarinflacionInteranualEsperadaOficial().filter((item: any) =>
      new Date(item.d) >= new Date('2022-01-01')
    );

    let char = this.getinflacionInteranualEsperadaOficial.map(base => ({ x: base.d, y: base.v }));
    let char2 = this.bcraService.buscarinflacionInteranualOficial().filter((item: any) =>
      new Date(item.d) >= new Date('2022-01-01')).map(base => ({ x: base.d, y: base.v }));

    this.chartInflacionInteranualEsperadaOficial = new Chart('canvas2', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Esperada',
            borderColor: '#1018BD',
            borderWidth: 1,
            data: char,
          },
          {
            label: 'Oficial',
            borderColor: '#06F34B',
            borderWidth: 1,
            data: char2,
          }
        ]
      }, options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month'
            }
          }
        }
      }
    });
  }



  months(config: any) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var values = [];
    var i, value;

    for (i = 0; i < count; ++i) {
      value = MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }

    return values;
  }

  filterData(datos: Inflacion[], year: number) {
    return datos.map(res => res).filter((item: any) =>
      new Date(item.d).getFullYear() == year
    ).map(res => res.v);
  }

}
