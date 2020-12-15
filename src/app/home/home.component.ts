import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: firebase.User;

  constructor(
    private auth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.user = user;
    });
  }

}
