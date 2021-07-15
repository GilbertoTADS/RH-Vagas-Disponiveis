import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  email = new FormControl(null,[Validators.required, Validators.email]);
  recovery = new FormGroup({ 'email':this.email });

  constructor() { }

  ngOnInit(): void {
  }
  sendMailRecovery():void{
    
  }

}
