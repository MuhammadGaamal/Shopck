import {Component} from '@angular/core';
import {DataStorageService} from '../../Shared/data-storage.service';
import {RecipeService} from '../../recipes/recipe.service';
import {HttpResponse} from '@angular/common/http';
import {Recipe} from '../../recipes/recipe.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService, private authService: AuthService) {}
  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
      }
    );
  }
  onGetData() {
    this.dataStorageService.getRecipes().subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
    });
  }
  onLogout() {
    this.authService.logout();
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
