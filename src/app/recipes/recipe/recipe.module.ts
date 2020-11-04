import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipesComponent} from '../recipes.component';
import {RecipeDetailComponent} from '../recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from '../recipe-edit/recipe-edit.component';
import {RecipeItemComponent} from '../recipe-list/recipe-item/recipe-item.component';
import {RecipeListComponent} from '../recipe-list/recipe-list.component';
import {RecipeStartComponent} from '../recipe-start/recipe-start.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RecipesRoutesModule} from './recipes-routes/recipes-routes.module';
import {SharedModule} from '../../Shared/shared/shared.module';

@NgModule({
  declarations: [RecipesComponent,
  RecipeDetailComponent,
  RecipeEditComponent,
  RecipeItemComponent,
  RecipeListComponent,
  RecipeStartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutesModule,
    SharedModule
  ]
})
export class RecipeModule { }
