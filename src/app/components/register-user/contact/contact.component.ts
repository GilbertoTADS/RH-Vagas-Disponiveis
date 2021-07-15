import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUserComponent } from '../register-user.component';
import { RegisterService } from '../../../services/register-user/register.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends RegisterUserComponent implements OnInit {

  constructor(
    protected registerUser:RegisterService, 
    protected router:Router, 
    protected ngbModal:NgbModal 
     ) {
    super(registerUser, router, ngbModal);
   }

  ngOnInit(): void {
    this.start()
  }
  ngOnChanges():void{
    this.getChanges();
  }

}
