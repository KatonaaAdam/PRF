import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { ConnectionService } from '../utils/connection.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  id: string;
  name: string;
  price: string;
  desc: string;
  isAdmin:boolean;

  constructor(private router: Router, private conServis:ConnectionService ){
    this.id = '';
    this.name = '';
    this.price = '';
    this.desc = '';
    this.isAdmin = localStorage.getItem('role') === 'admin' ?  true : false;
  }

lista: any

goToAbout(){
  this.router.navigate(['about']);
}

goToEdit(id: string){
  this.router.navigate(['edit-item',{id}]);
}

goToCreateNew(){
  this.router.navigate(['creat-item']);
}

Logout(){
  this.router.navigate(['login']);
  localStorage.clear();
}
buyItem(name: string,price:string){
  window.alert('You buy the '+ name+', which was '+price+'! Thank you for your purchase!'); 
}


  ngOnInit(): void {
this.conServis.listAru().subscribe((list) =>{
  console.log(list);
  this.lista = list;
  //this.router.navigate(['/shop'])
},error=>{
  console.log('listAru componentben: '+ error); 
})
  }

  deleteItem(id: string){
    this.conServis.DeleteAru(id).subscribe((list) =>{
      location.reload();

    },error=>{
      console.log(id);
      console.log('DeleteAru componentben: '+ error); 
      window.alert(error);
    })
  }

 

  
}
