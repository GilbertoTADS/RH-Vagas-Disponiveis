import { Component, OnInit, OnChanges } from '@angular/core';
import { RegisterUserComponent } from '../register-user.component';
import { RegisterService } from '../../../services/register-user/register.service';
import { FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { DateCustom } from './../../resources/helpers/validation-date';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss'],
})
export class FormationComponent extends RegisterUserComponent implements OnInit, OnChanges {

  formation:FormArray = new FormArray([this.newGroup()]);

  constructor( 
    protected registerUser:RegisterService, 
    protected router:Router,
    protected ngbModal:NgbModal  
    ) { 
    super(registerUser, router, ngbModal);
    this.getChangesFormation();
    this.saveChangesFormation();
  }
    
  newGroup():FormGroup{
    return new FormGroup({
      'typeFormation': new FormControl('I'),
      'institution':new FormControl(''), 
      'nameOfCourse':new FormControl(''), 
      'courseFinished':new FormControl(''), 
      'dateConclusion':new FormControl(DateCustom.currentDate(),[ <ValidatorFn>this.dateMaxIsToday, <ValidatorFn>this.isValidDate ]), 
      'dateInited':new FormControl(DateCustom.currentDate(), [ <ValidatorFn>this.dateMaxIsToday, <ValidatorFn>this.isValidDate ]), 
      'dateFinal':new FormControl(DateCustom.currentDate(),[ <ValidatorFn>this.isValidDate ]), 
    }) as FormGroup;
  }
  
  ngOnInit(): void {
    this.start();
  }

  ngOnChanges():void{
    this.getChanges()
  }

  private getChangesFormation():void{
    let registerStorage = sessionStorage.getItem('register-user-formation')
    if(registerStorage === null ) return;
    this.formation.markAllAsTouched()
    let registerJSON = <JSON[]>JSON.parse(registerStorage);
    this.formation.clear();
    registerJSON.forEach(() => {
      this.newFormation()
    })
    this.formation.setValue(registerJSON)
  }

  private saveChangesFormation():void{
    this.formation.valueChanges.subscribe( e => 
      sessionStorage.setItem('register-user-formation',JSON.stringify(e)))
  }

  newFormation():void{
    this.formation.push(this.newGroup())
  }

  deleteFormation(index:number):void{
    this.formation.removeAt(index)
  }

}
