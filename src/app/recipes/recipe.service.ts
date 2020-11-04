import { Injectable } from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../Shared/ingredients.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable()
export class RecipeService {
  recipeschanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Meat with salad',
      'parpequed tasty meat',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [
        new Ingredient('meat', 1),
        new Ingredient('salad', 1)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://d9hyo6bif16lx.cloudfront.net/live/img/production/detail/menu/lunch-dinner_burgers_all-american-burger.jpg',
      [
        new Ingredient('bread', 2),
        new Ingredient('burgers', 1),
        new Ingredient('French Fries', 20)
      ])
  ];

  getRecipes() {
    // slice is a method return a new array with the exact copy of one in the service file
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeschanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeschanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeschanged.next(this.recipes.slice());
  }
  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeschanged.next(this.recipes.slice());
  }
}
