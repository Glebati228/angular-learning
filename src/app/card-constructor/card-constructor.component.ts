import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsComponent } from '../news/news.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-card-constructor',
  templateUrl: './card-constructor.component.html',
  styleUrls: ['./card-constructor.component.css']
})
export class CardConstructorComponent {

  form : FormGroup;

  constructor( 
    public dialogRef : MatDialogRef<CardConstructorComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private fb : FormBuilder) 
  {
    this.form = fb.group({
      title : [''],
      text : [''],
      image : [''],
    });
  }

  submit()
  {
    let title = this.form.get('title').value;
    let text = this.form.get('text').value;
    let image = this.form.get('image').value;

    this.dialogRef.close({title : title, text : text, image : image});
  }
}
