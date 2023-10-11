import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Workspaces } from '../Data';
import { Types } from 'mongoose';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  wSLoaded = signal<boolean>(false);
  curWsId = signal<string>('');
  defaultWsId = signal<string>('');
  workspaces = signal<Workspaces>({});
  userId = signal<string>('');

  constructor(private http: HttpClient, private router: Router) { }

  loadPage(){
    this.http.post<any>('http://localhost:3000/api/getWorkspaces',{
      userId: this.userId(),
    }).subscribe(data=>{
      this.workspaces.set(data)
      this.wSLoaded.set(true)
      this.defaultWsId.set(Object.keys(data)[0])
      this.router.navigate(['workspace/',this.defaultWsId()])
    })
  }

  getWorkspace(){
    this.http.post<any>('http://localhost:3000/api/getWorkspaces',{
      userId: this.userId(),
    }).subscribe(data=>{
      this.workspaces.set(data)
      this.wSLoaded.set(true)
    })
  }

  addWorkspace(){
    this.http.put<any>('http://localhost:3000/api/addWorkspace',{
      userId: this.userId(),
      name: 'New Space',
    }).subscribe(data=>{
      this.getWorkspace()
    })
  }

  updateWorkspaceName(){
    this.http.put<any>('http://localhost:3000/api/updateWorkspaceName',{
      userId: this.userId(),
      workspaceId: this.curWsId(),
      name: this.workspaces()[this.curWsId()].name,
    }).subscribe(data=>{
      this.getWorkspace()
    })
  }

  deleteWorkspace(){
    if(this.curWsId()===this.defaultWsId()){
      alert('Cannot delete default workspace')
      return
    }
    this.http.put<any>('http://localhost:3000/api/deleteWorkspace',{
      userId: this.userId(),
      workspaceId: this.curWsId(),
    }).subscribe(data=>{
      this.router.navigate(['workspace/',this.defaultWsId()])
      this.getWorkspace()
    })
  }

  addNote(){
    this.http.put<any>('http://localhost:3000/api/addNote',{
      userId: this.userId(),
      workspaceId: this.curWsId(),
    }).subscribe(data=>{
      this.getWorkspace()
    })
  }

  updateTitle(noteId: Types.ObjectId, title: string){
    this.http.put<any>('http://localhost:3000/api/updateNoteTitle',{
      userId: this.userId(),
      workspaceId: this.curWsId(),
      noteId: noteId,
      title: title,
    }).subscribe(data=>{
      // this.getWorkspace()
    })
  }

  updateContent(noteId: Types.ObjectId, content: string){
    this.http.put<any>('http://localhost:3000/api/updateNoteContent',{
      userId: this.userId(),
      workspaceId: this.curWsId(),
      noteId: noteId,
      content: content,
    }).subscribe(data=>{
      // this.getWorkspace()
    })
  }

  deleteNote(noteId: Types.ObjectId){
    this.http.put<any>('http://localhost:3000/api/deleteNote',{
      userId: this.userId(),
      workspaceId: this.curWsId(),
      noteId: noteId,
    }).subscribe(data=>{
      this.getWorkspace()
    })
  }
}
