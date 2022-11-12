import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent{

  //Se le pasa la referencia local del elemento html que queremos obtener y debemos ponerle un nombre y se pone un ! para asegurarse de que el objeto no es nulo
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifService:GifsService){}

  public buscar():void {
    
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0){
      return;
    }
    this.gifService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = "";
  }
}
