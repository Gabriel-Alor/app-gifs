import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  //Hace que el servicio se pueda usar de manera global
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "FnImkQe8Hl9FxuEx919EMeEDKloAv81e";
  private servicioUrl: string = "https://api.giphy.com/v1/gifs";
  private _historial: string[] = [];

  // TODO: Cambiar any por su tipo correspondiente  
  public resultados: Gif[] = [];

  get historial(): string[] {
      return [...this._historial];
  }

  constructor( private htpp: HttpClient ){
    if( localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }

  public buscarGifs( query:string = '' ) {
    //convertir en minuscula
    query = query.trim().toLocaleLowerCase();

    //preguntas si ya existe la palabra en el arreglo
    if( !this._historial.includes(query) ){
      //agregar el arreglo
      this._historial.unshift(query);
      //permitir que solo puedan haber 10 elementos en el arreglo
      this._historial = this._historial.splice(0,10);

      //Guardar en el localStorage
      //El JSON convierte cualquier objeto en un string
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit','10')
          .set('q',query);

    console.log(params);

    this.htpp.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
    .subscribe( (response) => {
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })
  
    console.log(this._historial);
  }


  
}
