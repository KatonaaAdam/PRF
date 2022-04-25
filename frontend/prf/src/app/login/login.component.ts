 import { Component, OnInit } from '@angular/core';
import { LoginService } from '../utils/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username: string;
  password: string;

  constructor(private loginService:LoginService ,private router:Router ) {
    this.username = '';
    this.password = '';

   }

   goToRegist(){
    this.router.navigate(['registration']);
  }

   login(){
    console.log(' username: '+ this.username + ',  pwd: '+this.password);
     if(this.username !='' && this.password!=''){
       this.loginService.login(this.username, this.password).subscribe((msg : any) =>{
         console.log(msg);
         if(msg.accessLevel=='admin'){
          localStorage.setItem('role',msg.accessLevel);
         }
         localStorage.setItem('user',this.username);
         
         this.router.navigate(['/shop'])
       },error=>{
         console.log('login componentben: '+ error);
       })
       
     }
   }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      localStorage.removeItem('user');
      this.loginService.logout().subscribe(msg =>{
        console.log(msg);
      },error=>{
        console.log(error);
      })

    }
  }






}
