import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Inflacion } from 'src/app/models/inflacion';
import { BcraService } from 'src/app/services/bcra.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  chart: any = [];
  chartInflacionMensualOficial: any = [];
  datos: Inflacion[] = [];

  constructor(private bcraService: BcraService) {
    Chart.register(...registerables);
  }


  ngOnInit(): void {

    this.bcraService.getinflacionInteranualOficial().subscribe(res => {
      this.datos = res;

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.months({ count: 12 }),
          datasets: [
            {
              label: '2017',
              data: this.filterData(2017),
              borderWidth: 3,
              fill: false,
              borderColor: '#212F3D'
            },
            {
              label: '2018',
              data: this.filterData(2018),
              borderWidth: 3,
              fill: false,
              borderColor: '#AF601A'
            },
            {
              label: '2019',
              data: this.filterData(2019),
              borderWidth: 3,
              fill: false,
              borderColor: '#1D8348'
            },
            {
              label: '2020',
              data: this.filterData(2020),
              borderWidth: 3,
              fill: false,
              borderColor: '#117A65'
            },
            {
              label: '2021',
              data: this.filterData(2021),
              borderWidth: 3,
              fill: false,
              borderColor: '#27AE60'
            },
            {
              label: '2022',
              data: this.filterData(2022),
              borderWidth: 3,
              fill: false,
              borderColor: '#A6ACAF'
            }
          ]
        }
      });
    });

    this.bcraService.getInflacionMensualOficial().subscribe(res => {
      this.datos = res;

      this.chartInflacionMensualOficial = new Chart('canvas1', {
        type: 'line',
        data: {
          labels: this.months({ count: 12 }),
          datasets: [
            {
              label: '2021',
              data: this.filterData(2021),
              borderWidth: 3,
              fill: false,
              borderColor: '#212F3D'
            },
            {
              label: '2022',
              data: this.filterData(2022),
              borderWidth: 3,
              fill: false,
              borderColor: '#AF601A'
            }
          ]
        }
      });
    });
  }


  MONTHS = [
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

  months(config: any) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var values = [];
    var i, value;

    for (i = 0; i < count; ++i) {
      value = this.MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }

    return values;
  }

  course = [
    { 'id': 1, 'name': 'Learn Angular', 'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'image': '../../assets/angular.jpg' },
    { 'id': 2, 'name': 'Learn Typescript', 'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'image': '../../assets/typescript.jpg' },
    { 'id': 3, 'name': 'Learn Nodejs', 'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'image': '../../assets/nodejs.jpg' },
    { 'id': 4, 'name': 'Learn Reactjs', 'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'image': '../../assets/reactjs.jpg' },
  ]

  filterData(year: number) {
    return this.datos.map(res => res).filter((item: any) =>
      new Date(item.d).getFullYear() == year
    ).map(res => res.v);
  }

}
