import {Ingredient} from '../Shared/ingredients.model';
import {Subject} from 'rxjs';

// we apply TD approach in creating forms for the shopping list
export class ShoppingListService {
  // we used subject and subscripe instead of event emitter
  // and we use subject in start editing to edit our items
  ingredientschanged = new Subject<Ingredient[]>();
  startEditing  = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 3)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // to update our ingredients when add a new one
    this.ingredientschanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // this to loop on our ingredient but it's a bad way because there will be a lot of event emmissions
    // for (const ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    // we will directly add all ingredient in one go and then emit to our event
    // then we will use spread operator to turn an array of elements to a list of elements
    this.ingredients.push(...ingredients);
    this.ingredientschanged.next(this.ingredients.slice());
  }
  // we will call this method when we're on edit mode
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientschanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    // splice allow us to start at specific index and then remove one element
    this.ingredients.splice(index, 1);
    this.ingredientschanged.next(this.ingredients.slice());
  }
  constructor() { }
}
