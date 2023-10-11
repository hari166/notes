import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/Data';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit{
  @Input() note: Note = {} as Note;

  title:string = '';
  content: string = '';

  constructor(private http: HttpClient, private api: ApiService){}

  ngOnInit(){
    this.title = this.note.title;
    this.content = this.note.content;
  }

  updateTitle(){
    this.api.updateTitle(this.note._id,this.title)
    this.note.title = this.title;
  }

  updateContent(){
    this.api.updateContent(this.note._id,this.content)
    this.note.content = this.content;
  }  

  deleteNote(){
    this.api.deleteNote(this.note._id)
  }

}
