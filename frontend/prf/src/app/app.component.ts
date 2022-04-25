import { Component } from '@angular/core';
import { ConnectionService } from './utils/connection.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor(private connectionService: ConnectionService){
  

}

  title = 'prf';
  
  
}
