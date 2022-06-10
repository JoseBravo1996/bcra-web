import { Component, OnInit } from '@angular/core';
import { BcraService } from '../../services/bcra.service';
import { Inflacion } from '../../models/inflacion';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  reserva!: Inflacion;
  baseMonetaria!: Inflacion;
  baseMonetariaInteranual!: Inflacion;
  data: Inflacion[] = [];
  constructor(private bcraService: BcraService) { 
    this.bcraService.getReservas().subscribe(res => {
      this.reserva = res
    });

    this.bcraService.getBaseMonetaria().subscribe(res => {
      this.baseMonetaria = res
    });

    this.bcraService.getBaseMonetariaInteranual().subscribe(res => {
      this.baseMonetariaInteranual = res
    });
  }

  ngOnInit(): void {
    
  }

}
