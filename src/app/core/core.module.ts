import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {RecipeService} from '../recipes/recipe.service';
import {DataStorageService} from '../Shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {SharedModule} from '../Shared/shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [ShoppingListService, RecipeService, DataStorageService, AuthService]
})
export class CoreModule { }
