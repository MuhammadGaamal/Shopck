import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeform: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        // check if it works using console.log
        this.editMode = params.id != null;
        // now we call the form and we will synchronize it with our html
        // we go to the app module to import Reactive form module so we can use the directives to synchronize
        this.initform();
      }
    );
  }
  onSubmit() {
    // because the js object has the same format name, description, image path so we can pass the value directly
    // and it's advantage of reactive approach
    // const newRecipe = new Recipe(this.recipeform.value.name, this.recipeform.value.description,
    //   this.recipeform.value.imagepath,
    //   this.recipeform.value.ingredients);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeform.value);
    } else {
      this.recipeService.addRecipe(this.recipeform.value);
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  // Add extra Ingredients to existing recipes
  onAddIngredient() {
    (this.recipeform.get('ingredients') as FormArray).push(
      new FormGroup({
        name : new FormControl(null, Validators.required),
        amount : new FormControl(null , [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }
  onDeleteIngredient(index: number) {
    (this.recipeform.get('ingredients') as FormArray).removeAt(index);
  }

  getControls() {
    return (this.recipeform.get('ingredients') as FormArray).controls;
  }
  // this method to initialize our form the first form that will show up and decide if we're on edit mode or we creat a new recipe
  private initform() {
    let recipeName = '';
    let recipeImagepath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagepath = recipe.imagepath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name : new FormControl(ingredient.name, Validators.required),
              amount : new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeform = new FormGroup({
      name : new FormControl(recipeName, Validators.required),
      imagepath : new FormControl(recipeImagepath, Validators.required),
      description : new FormControl(recipeDescription, Validators.required),
      ingredients : recipeIngredients
    });
  }
}
