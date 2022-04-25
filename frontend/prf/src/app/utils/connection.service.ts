import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http : HttpClient) {}

  greet(){
    return this.http.get(environment.serverUrl,{responseType:'text',withCredentials:true});
  }

  listAru(){
    return this.http.get(environment.serverUrl+'webshop',{withCredentials:true});
  }

  AddAru(id: string, name: string, price: string, desc :string){
    return this.http.post(environment.serverUrl+'webshop',{id:id,name:name,price:price,desc:desc},{withCredentials:true});
  }

  EditAru(id: string, name: string, price: string, desc :string){
    return this.http.put(environment.serverUrl+'webshop',{id:id,name:name,price:price,desc:desc},{responseType:'text',withCredentials:true});
  }

  DeleteAru(id: string){
    return this.http.delete(environment.serverUrl+'webshop',{responseType:'text',withCredentials:true,body:{id}});
  }

  OneItem(id: string){
    return this.http.get(environment.serverUrl+`edit/${id}`,{withCredentials:true});
  }
}
