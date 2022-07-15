import { Component, OnInit } from '@angular/core';
import { BcraService } from './services/bcra.service';
import {ReversePipe} from 'ngx-pipes';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ReversePipe]
})
export class AppComponent implements OnInit {

  constructor(private bcraService: BcraService, private reversePipe: ReversePipe){
    this.bcraService.getinflacionInteranualOficial();
    this.bcraService.getInflacionMensualOficial();
    this.bcraService.getInflacionMensualEsperadaOficial();
    this.bcraService.getCotizacionUSD();
    this.bcraService.getCotizacionUSDOf();
    this.reversePipe.transform('foo');
  }

  ngOnInit(): void {
  }

}
