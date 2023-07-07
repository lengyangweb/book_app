import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  ngOnInit() {
    
    this._auth.authenticated()
      .then((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this._router.navigate(['/home/welcome']);
        }
      })
      .catch((error: Error) => console.error(error.message));

    this.loginForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return this._messageService.add({ 
        severity: 'error', 
        summary: 'Login Fail', 
        detail: 'Email and password is required.' 
      });
    }

    this._auth.signIn(this.loginForm.value)
      .then((userInfo: any) => {

        if (userInfo && userInfo.hasOwnProperty('_id') && userInfo._id) {
          this._auth.setCredential(userInfo);
          this._router.navigate(['/home/welcome']);
        }
        
      })
      .catch((err: any) => {
        console.log(err?.message || err?.data?.message)

        return this._messageService.add({ 
          severity: 'error', 
          summary: 'Login Fail', 
          detail: err.message 
        });
      })
  }

}
