import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private _auth: AuthService, private _router: Router) {}

  userInfo: any;

  ngOnInit(): void {
    let userInfoStr: any = localStorage.getItem('userInfo');
    this.userInfo = JSON.parse(userInfoStr);
  }

  logout(): void {
    this._auth.signOut()
    .then((success: boolean) => {
      if (success) {
        this._auth.clearCredential();
        this._router.navigate(['/']);
      }
    })
  }
}
