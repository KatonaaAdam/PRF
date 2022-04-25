import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from '../../utils/connection.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  id: string;
  name: string;
  price: string;
  desc: string;

  constructor(private router: Router, private conServis:ConnectionService, private route:ActivatedRoute){
    this.id = '';
    this.name = '';
    this.price = '';
    this.desc = '';

   }

  goToShop(){
    this.router.navigate(['shop']);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(par=>{
      const id = par.get('id');
      if(id){
      this.conServis.OneItem(id).subscribe((list: any) =>{
        //location.reload();
        console.log(list);
        this.id=list.id;
        this.name=list.name;
        this.price=list.price;
        this.desc=list.desc;
        
  
      })
    }

    },error=>{
      console.log('edit hiba!!!')
    })

  }

  updateItem(){
    if(this.id =='' || this.name=='' || this.price=='' || this.desc==''){
      window.alert("All fields are required!");
    }
     if(this.id !='' && this.name!='' && this.price!='' && this.desc!=''){
    this.conServis.EditAru(this.id,this.name,this.price,this.desc).subscribe((list) =>{
      console.log(list);
      this.router.navigate(['shop']);
    },error=>{
      window.alert("An error occurred while adding!");
      console.log('AddAru componentben: '+ error);
    });
  }
  }

}
