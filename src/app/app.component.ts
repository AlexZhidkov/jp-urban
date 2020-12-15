import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LinkMenuItem } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showSignInButton: boolean;
  avatarLinks: LinkMenuItem[];

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.showSignInButton = false;
    this.auth.user.subscribe(user => {
      this.showSignInButton = Boolean(!user);
    });
  }

  onSignOut(): void {
    this.router.navigate(['/']).then(() => location.reload());
  }
}
