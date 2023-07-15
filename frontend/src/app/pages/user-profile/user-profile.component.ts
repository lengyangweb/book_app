import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {

  userForm!: FormGroup;
  userInfo: any;

  constructor(
    private _fb: FormBuilder, 
    private _user: UserService,
    private _auth: AuthService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    const userInfoStr: any = localStorage.getItem('userInfo');
    this.userInfo = JSON.parse(userInfoStr);

    this.userForm = this._fb.group({
      name: [this.userInfo.name, [Validators.required]],
      email: [this.userInfo.email, [Validators.required]],
    });

  }

  onSubmit(): void {
    if (!this.userForm.valid) {
      return bootbox.alert({ title: 'Update User Profile', message: 'All fields must be fill out.' });
    }

    this._user.updateUserInfo(this.userForm.value)
      .then((res: any) => {
        console.log(res);
        this._auth.setCredential(res);
        
        this._messageService.add({
          severity: 'success',
          summary: 'Update User',
          detail: 'User profile has been updated.'
        })
      });
  }

}
