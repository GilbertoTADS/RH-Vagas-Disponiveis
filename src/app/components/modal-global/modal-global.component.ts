import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-global',
  templateUrl: './modal-global.component.html',
  styleUrls: ['./modal-global.component.scss'],
  providers:[NgbActiveModal]
})
export class ModalGlobalComponent implements OnInit {
  closeResult:any = '';
  @Input()content:any;
  @Input()config:NgbModalOptions = { centered:true, keyboard:true, size:'lg', scrollable:true};
  @Input()classBtnOpen:string = 'btn btn-primary';
  @Input()btnText:string = 'button'
  @Input()nameIconButton = '';
  @Input()classIconButton:string = '';
  constructor(
    private modalService: NgbModal,
    private modal:NgbActiveModal
  ) { }

  ngOnInit(): void {
  }
  open() {
    return this.modalService.open(this.content, this.config).result
  }
  close(){
    this.modal.close()
  }

}