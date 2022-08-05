import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public tutorial:string|null = null;
  @ViewChild('tuto') private tuto:any;
  @ViewChild('boton') private boton:any;
  public pag:number = 0;

  constructor(private modalService: NgbModal) { }

  ngAfterViewInit(): void {
    this.tutorial = localStorage.getItem('tutorial');
    if (!this.tutorial||this.tutorial==='false') {
      this.tutorial='false';
      this.boton.nativeElement.click()
      //this.modalService.open(this.tuto);
    }
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, ojala que funque')
  }

  ngOnInit(): void {
  }

  yaLoVi(){
    localStorage.setItem('tutorial', 'true')
  }

  masPagina(){
    this.pag++;
  }

  menosPagina(){
    this.pag--;
  }

}
