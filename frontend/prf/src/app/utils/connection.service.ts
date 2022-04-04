import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor() { }

  greet(){
    console.log('greet method in connection.service :D');
  }
}
