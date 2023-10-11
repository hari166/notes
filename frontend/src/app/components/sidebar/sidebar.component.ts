import { Component, Input, signal } from '@angular/core';
import { Workspace } from 'src/app/Data';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() workspaces: { [key: string]: Workspace } = {};
  readonly: boolean = true;

  constructor(public auth: AuthService, private http: HttpClient, private router: Router, private api: ApiService) { }

  addWorkspace(){
    this.api.addWorkspace()
  }

  updateWorkspaceName(){
    this.api.updateWorkspaceName()
    this.readonly = true;
  }

  edit(){
    this.readonly = !this.readonly;
  }

  deleteWorspace(){
    this.api.deleteWorkspace()
    this.readonly = true;
  }

  getCurWsId(){
    return this.api.curWsId()
  }

}
