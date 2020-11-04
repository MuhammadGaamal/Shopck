import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';


@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }
  storeRecipes() {
    const token = this.authService.getToken();
    // we add json to allow firebase to handle this correctly other wise it will get a coarse error
    return this.http.put('https://shopck-cd3bd.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }
  getRecipes() {
   const token = this.authService.getToken();
   return this.http.get('https://shopck-cd3bd.firebaseio.com/recipes.json?auth=' + token);
  }
}
