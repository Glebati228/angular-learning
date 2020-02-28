import { Component, OnInit } from '@angular/core';
import { AppCommonService } from '../_services/auth.service';
import { Role } from '../../typings'
import { MatDialog } from '@angular/material/dialog';
import { CardConstructorComponent } from '../card-constructor/card-constructor.component';

class Card
{
  title : string;
  text : string;
  img : string;
}

@Component({
  selector: 'app-news',
  templateUrl : './news.component.html',
  styles: ['./mat.styles.css']
})
export class NewsComponent implements OnInit 
{
  Role = Role;
  // card = {
  //   title : "Card Title",
  //   text : "Some quick example text to build on the card title and make up the bulk of the card's content.", 
  //   img : "https://upload.wikimedia.org/wikipedia/commons/4/46/%D0%A1%D0%B5%D1%80%D1%8B%D0%B9_%D1%86%D0%B2%D0%B5%D1%82-_2014-03-15_18-16.jpg"};

  card : Card = new Card();

  news = [
  ];

  constructor(
    public appService : AppCommonService,
    private dialog : MatDialog) 
  {
    this.card.img = "https://upload.wikimedia.org/wikipedia/commons/4/46/%D0%A1%D0%B5%D1%80%D1%8B%D0%B9_%D1%86%D0%B2%D0%B5%D1%82-_2014-03-15_18-16.jpg";
    this.card.text = "Some quick example text to build on the card title and make up the bulk of the card's content.";
    this.card.title = "Card title";

    this.news.push( 
      {card : this.card},
      {card : this.card},
      {card : this.card},
      {card : this.card});
  }

  ngOnInit(): void {
  }




  openConstructor()
  {
    const dialogRef = this.dialog.open(CardConstructorComponent, {
      height: '600px',
      width: '300px',

      data : {
        email : this.appService.currentUserValue.value.email,
        role : this.appService.currentUserValue.value.role,
      }
    });

    dialogRef.afterClosed().subscribe(result =>{
      
      if(result)
      {
        let card = new Card();
        card.title = result.title;
        card.text = result.text;
        card.img = result.image;
        this.news.push({card : card});
      }
    }, 
    error=> console.log(error));
  }

  hasAccess(role : Role) : boolean
  {
    return this.appService.currentUserValue.value.role === role;
  }
}
