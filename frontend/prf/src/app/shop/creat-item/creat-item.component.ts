import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../../utils/connection.service';

@Component({
  selector: 'app-creat-item',
  templateUrl: './creat-item.component.html',
  styleUrls: ['./creat-item.component.css']
})
export class CreatItemComponent implements OnInit {

  id: string;
  name: string;
  price: string;
  desc: string;

  constructor(private router: Router, private conServis:ConnectionService){
    this.id = '';
    this.name = '';
    this.price = '';
    this.desc = '';
  }

lista: any

  goToShop(){
    this.router.navigate(['shop']);
  }

  ngOnInit(): void {
  }

  addNewItem(){
    if(this.id =='' || this.name=='' || this.price=='' || this.desc==''){
      window.alert("All fields are required!");
    }
     if(this.id !='' && this.name!='' && this.price!='' && this.desc!=''){
    this.conServis.AddAru(this.id,this.name,this.price,this.desc).subscribe((list) =>{
      console.log(list);
      this.router.navigate(['shop']);
    },error=>{
      window.alert("An error occurred while adding!");
      console.log('AddAru componentben: '+ error);
    });
  }
  }
}
