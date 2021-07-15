import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RegisterUserComponent } from '../register-user.component';
import { RegisterService } from '../../../services/register-user/register.service';
import { DateCustom } from './../../resources/helpers/validation-date';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent extends RegisterUserComponent implements OnInit,OnChanges {
  experiences:FormArray = new FormArray([this.newGroup()]);
  constructor(
    protected registerUser:RegisterService, 
    protected router:Router,
    protected ngbModal:NgbModal 
    ) { 
    super(registerUser, router, ngbModal);
    this.getChangesExperiences();
    this.saveChangesExperiences();
  }

  ngOnInit(): void {
    this.start();
  }
  ngOnChanges():void{
    this.getChanges()
  }
  newGroup():FormGroup{
    return new FormGroup({
      'nameBussiness':new FormControl(''), 
      'dateInited':new FormControl(DateCustom.currentDate(),[<ValidatorFn>this.isValidDate]), 
      'dateFinal':new FormControl(DateCustom.currentDate(),[<ValidatorFn>this.isValidDate]), 
      'office':new FormControl(''), 
      'describe':new FormControl(''), 
    }) as FormGroup;
  }
  private getChangesExperiences():void {
    let registerStorage = sessionStorage.getItem('register-user-experiences')
    if(registerStorage === null ) return;
    this.experiences.markAllAsTouched()
    let registerJSON = <JSON[]>JSON.parse(registerStorage);
    this.experiences.clear();
    registerJSON.forEach((value,idx) => {
      this.newExperiences()
    })
    this.experiences.setValue(registerJSON)
    
  }
  private saveChangesExperiences():void{
    this.experiences.valueChanges.subscribe( (e:string) => {
      sessionStorage.setItem('register-user-experiences',JSON.stringify(e))
    })
  }

  newExperiences():void{
    this.experiences.push(this.newGroup())
  }

  deleteExperience(index:number):void{
    this.experiences.removeAt(index)
  }

}
