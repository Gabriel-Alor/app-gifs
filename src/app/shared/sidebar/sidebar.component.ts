import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent{

  get historial(): string[] {
    return this.gifsService.historial;
  }

  //Inyectar el servicio
  constructor( private gifsService: GifsService) { }


  public buscar( termino: string) {
    this.gifsService.buscarGifs( termino );
  }


}
