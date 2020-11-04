import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadeddata = 'recipe';
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyANyox726zk_f-kDlBSv5kicd7Hi6bsXiU',
      authDomain: 'shopck-cd3bd.firebaseapp.com'
    });
  }

  onNavigate(feature: string) {
    this.loadeddata = feature;
  }
}
