import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Inflacion } from 'src/app/models/inflacion';
import { BcraService } from '../../services/bcra.service';
import 'chartjs-adapter-date-fns';
import { of } from 'rxjs';
import { Char } from 'src/app/models/char';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [DatePipe]
})
export class ContactComponent implements OnInit {

  chart: any = [];
  chartInflacionMensualOficial: any = [];
  datos: Inflacion[] = [];

  info: Inflacion[] = [
    {
      "d": "2021-01-31",
      "v": 4
    },
    {
      "d": "2021-02-28",
      "v": 3.6
    },
    {
      "d": "2021-03-31",
      "v": 4.8
    },
    {
      "d": "2021-04-30",
      "v": 4.1
    },
    {
      "d": "2021-05-31",
      "v": 3.3
    },
    {
      "d": "2021-06-30",
      "v": 3.2
    },
    {
      "d": "2021-07-31",
      "v": 3
    },
    {
      "d": "2021-08-31",
      "v": 2.5
    },
    {
      "d": "2021-09-30",
      "v": 3.5
    },
    {
      "d": "2021-10-31",
      "v": 3.5
    },
    {
      "d": "2021-11-30",
      "v": 2.5
    },
    {
      "d": "2021-12-31",
      "v": 3.8
    },
    {
      "d": "2022-01-31",
      "v": 3.9
    },
    {
      "d": "2022-02-28",
      "v": 4.7
    },
    {
      "d": "2022-03-31",
      "v": 6.7
    },
    {
      "d": "2022-04-30",
      "v": 6
    },
    {
      "d": "2022-05-31",
      "v": 5.1
    }
  ]
  bsConfig?: Partial<BsDatepickerConfig>;
  minMode: BsDatepickerViewMode = 'day';
  reserva!: Inflacion;
  // baseMonetaria!: Inflacion;
  baseMonetariaInteranual!: Inflacion;
  data: Inflacion[] = [];
  @ViewChild('startDate') startDate: ElementRef | undefined;
  @ViewChild('endDate') endDate: ElementRef | undefined;
  datePickerValue: Date = new Date(2020, 7);
  dateRangePickerValue?: (Date | undefined)[];
  // range1: Date = new Date(2020, 5);
  //range2: Date = new Date(2020, 8);
  range1?: string = '';
  range2?: string = '';
  dato?: Date;
  baseMonetaria: Inflacion[] = [];
  getBaseMonetaria!: Inflacion;
  // onValueChange(value: any): void {
  //   this.range1 = this.datePipe.transform(value[0], 'yyyy-MM-dd')?.toString();
  //   this.range2 = this.datePipe.transform(value[1], 'yyyy-MM-dd')?.toString();
  // }
  constructor(private bcraService: BcraService, private datePipe: DatePipe) {
    this.bcraService.getBaseMonetaria();
    Chart.register(...registerables);

    this.bsConfig = {
      containerClass: 'theme-red',
      // dateInputFormat: 'dd-MM-yyyy'
    };
    // this.bcraService.getReservas().subscribe(res => {
    //   this.reserva = res
    // });

    // this.bcraService.getBaseMonetaria().subscribe(res => {
    //   this.baseMonetaria = res
    // });

    // this.bcraService.getBaseMonetariaInteranual().subscribe(res => {
    //   this.baseMonetariaInteranual = res
    // });
  }


  ngOnInit(): void {
    // of(this.info)

    // this.dateRangePickerValue = [this.range1, this.range2];
    this.bcraService.getBaseMonetaria().subscribe(res => {

      this.getBaseMonetaria = res.find((item: any) =>
        new Date(item.d) >= new Date('2022-07-12')
      );

      this.baseMonetaria = res.filter((item: any) =>
        new Date(item.d) >= new Date('2021-07-01')
      );

      let char = this.baseMonetaria.map(base => ({ x: base.d, y: base.v }));


      this.chartInflacionMensualOficial = new Chart('canvas10', {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Julio 2022',
              borderColor: '#212F3D',
              borderWidth: 1,
              data: char,
            }
          ]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'year'
              }
            },
            y: {
              // beginAtZero: true
            }
          }
        }
      });

    });



    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
  }


  onValueChange(value: any): void {
    const date2 = [...this.datos.map(x => x.d)];

    var dateinicial = this.datePipe.transform(value[0], 'yyyy-MM-dd')?.toString();
    var datefinal = this.datePipe.transform(value[0], 'yyyy-MM-dd')?.toString();

    const indexStart = date2.indexOf(dateinicial)
    const indexEnd = date2.indexOf(datefinal)

    const filterDate = date2.slice(indexStart, indexEnd + 1);

    this.chart.config.data.labels = filterDate;
    this.chart.update();
  }

}
