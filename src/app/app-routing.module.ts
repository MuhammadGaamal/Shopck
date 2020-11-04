import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './core/home/home.component';

// pathMatch: full only redirect if the full path is empty and this override our prefix
const appRoutes: Routes = [ { path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipe/recipe.module#RecipeModule'},
  {path: 'shopping-list', component: ShoppingListComponent},
 ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
  })
export class AppRoutingModule {

}
