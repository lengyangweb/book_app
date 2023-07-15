import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordUpdate, User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  userInfo!: User;
  passwordForm!: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _user: UserService,
    private _auth: AuthService,
    private _router: Router,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    // get user info
    this.getUserInfo();

    // iit password form
    this.passwordForm = this._fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  getUserInfo(): void {
    this._user.getUserProfile()
      .then((userInfo: User) => {
        this.userInfo = userInfo;
      })
  }

  onSubmit(): void {

    if (this.passwordForm.invalid) {
      return this._messageService.add({
        severity: 'error',
        summary: 'Update Password Error',
        detail: 'Password and confirmPassword fill must not be empty.'
      });
    }

    if (this.passwordForm.controls['password'].value !== this.passwordForm.controls['confirmPassword'].value) {
      return this._messageService.add({
        severity: 'error',
        summary: 'Update Password Error',
        detail: 'Password mistmatch'
      });
    }

    // validate the new password
    const passwordValidated = this.validatePassword(this.passwordForm.controls['password'].value);

    // if passwordValidated is not empty, show error dialog
    if (passwordValidated) {
      return this._messageService.add({
        severity: 'error',
        summary: 'Update Password Fail',
        detail: passwordValidated
      });
    }

    // get updated password
    const updatePassword: PasswordUpdate = { 
      _id: this.userInfo._id,
      password: this.passwordForm.controls['password'].value
     };

    this._user.updateUserPassword(updatePassword)
      .then((success: boolean) => {

        // if password is updated
        if (success) {
          return bootbox.confirm({
            title: 'Password Update',
            message: 'Do you want to logout and log back in?', 
            callback: (result: boolean) => {
            
              // if user confirm
              if (result) {
  
                // logout user out and navigate to login page
                this._auth.signOut().then((success: boolean) => {
  
                  // if user is logged out successfully
                  if (success) {
                    this._auth.clearCredential();
                    this._router.navigate(['/'])
                  }
  
                });
  
              } else {
                this.passwordUpdated(success);
              }
  
            }
          });
        }

      });

  }

  passwordUpdated(success: boolean): void {
    // show dialog
    this._messageService.add({
      severity: !success ? 'error' : 'success',
      summary: `Update Password ${ !success ? 'Fail' : 'Success' }`,
      detail: !success ? 'Unable to update password.' : 'Password has been updated.'
    })

    // if success then resetPassword field
    success && this.resetPassword();
  }

  validatePassword(password: string): string {
    const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+'];
    
    // split new password to a group of characters
    const passLetters = password.split('');
    
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    let charCounters = 0;

    passLetters.forEach((char: string) => {
      specialChars.indexOf(char) > -1 && charCounters++;
    })

    if (charCounters === 0) {
      return 'Password must contain at least one or more special characters.';
    }

    return '';

  }

  resetPassword(): void {
    this.passwordForm.controls['password'].setValue('');
    this.passwordForm.controls['confirmPassword'].setValue('');
  }

}
