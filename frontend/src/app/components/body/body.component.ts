import { Component, Input, OnInit, ElementRef, ViewChild, signal, HostBinding, effect, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note, Workspace, Workspaces } from 'src/app/Data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  @ViewChild('scrollContainer',{static: false}) scrollContainer: ElementRef<HTMLDivElement> = {} as ElementRef<HTMLDivElement>;

  winWidth = signal<number>(window.innerWidth);
  sideBarActive = signal<boolean>(false);
  isLoggedIn = signal<boolean>(true);
  darkmode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkmode')??'false')
  );

  constructor(private route: ActivatedRoute, private http: HttpClient, private api: ApiService, public auth: AuthService, private router: Router) {
    effect(()=>{
      window.localStorage.setItem('darkmode',JSON.stringify(this.darkmode()))
    })
  }

  scrollH(event: any) {
    this.scrollContainer.nativeElement.scrollLeft+=event.deltaY/2;
    event.preventDefault()
  }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(data=>{
      if(!data){
        this.isLoggedIn.set(false)
        this.api.wSLoaded.set(true)
        return
      }
    })
    this.auth.idTokenClaims$.subscribe(data=>{
      this.api.userId.set(data?data['sub']:'')
      this.route.params.subscribe(params => {
        this.api.curWsId.set(params['id']);
      });
      this.api.loadPage()
    })
  }

  addNote(){
    this.api.addNote()
  }

  getWs(){
    return this.api.workspaces()
  }

  getCurWsId(){
    return this.api.curWsId()
  }

  isWsLoaded(){
    return this.api.wSLoaded()
  }

  @HostBinding('class.dark') get mode() {
    return this.darkmode();
  }

  @HostListener('window:resize')
  onResize() {
    this.winWidth.set(window.innerWidth)
  }

  openSideBar(){
    this.sideBarActive.set(!this.sideBarActive())
  }
}
