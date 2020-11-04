import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // we used subject and subscripe instead of event emitter so we removed event emitter from it
  constructor() { }

  ngOnInit() {
  }

}
