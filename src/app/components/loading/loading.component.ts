import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input()invisible:boolean = false;
  constructor(  private modal:NgbActiveModal) { }

  ngOnInit(): void {
  }
  close():void{
    this.modal.close();
  }

}
