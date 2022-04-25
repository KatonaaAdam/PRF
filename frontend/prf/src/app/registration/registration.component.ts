import { Component, OnInit } from '@angular/core';
import { LoginService } from '../utils/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username: string;
  password: string;
  email: string;

  constructor(private loginService:LoginService ,private router:Router ) {
    this.username = '';
    this.password = '';
    this.email = '';
   }

  registration(){
    console.log(' username: '+ this.username + ',  pwd: '+this.password + ',  email: '+this.email);
    if(this.username =='' || this.password=='' || this.email==''){
      window.alert("All fields are required!");
    }
     if(this.username !='' && this.password!='' && this.email!=''){
       this.loginService.registration(this.username, this.password,this.email).subscribe(msg =>{
         console.log(msg);
         //localStorage.setItem('user',this.username);
         this.router.navigate(['/login'])
       },error=>{
         console.log('login componentben: '+ error);
       })
       
     }
   }

  goToLogin(){
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }


  

}
