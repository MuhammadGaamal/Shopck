import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../Shared/ingredients.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // get access to our form through the local reference to edit our item
  @ViewChild('lf') slform: NgForm;
  subscription: Subscription;
  // edit mode to recognize if i will edit an existing item or add a new one
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private slService: ShoppingListService) { }
// subscribe to my start editing subject to listen to it
  ngOnInit() {
    this.subscription = this.slService.startEditing.subscribe(
      // receive the number of the item we're about to edit
      (index: number) => {
        this.editedItemIndex = index;
        // we're on the edit mode
        this.editMode = true;
        // now we're on edit mode and we need to update our form so we will get access to the form
        this.editedItem = this.slService.getIngredient(index);
        // now we loaded our item in the form next we will change the bottom from add to edit
        this.slform.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
    // now we have all the information about the item we're about to edit and we will loading it into the form
  }
  // we add NgForm to active our form controls registration
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // update ingredient or add ingredient
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    // we turn edit mode to false after we're done with updating so i can add new items
    this.editMode = false;
    form.reset();
  }
  // this method for the clear button to let us clear item when we select it from the form or cancel a new item when i add it
  onClear() {
    this.slform.reset();
    this.editMode = false;
  }
  // here we want to inform the service to remove one of the items from the array
  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
