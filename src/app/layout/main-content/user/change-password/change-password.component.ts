import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../service/rest/rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder,
              private rest: RestService,
              private router: Router) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      // current: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/[^0-9]+/) ]],
      confirm: ['', [Validators.required, this.confirmationValidator]]
    });
  }

  confirmationValidator = (control: FormControl): {[s: string]: boolean} => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.changePasswordForm.controls['password'].value) {
      return {check: true, error: true };
    }
  }

  updateConfirmValidator(): void {
    setTimeout(() => {
      this.changePasswordForm.controls['confirm'].updateValueAndValidity();
    });
  }

  changePassword() {
    const body = {
      new_password1: this.changePasswordForm.value.password,
      new_password2: this.changePasswordForm.value.confirm
    };
    console.log('body', body);
    this.rest.changePassword(body).subscribe(
      (data) => {console.log('data', data); },
      err => {
        const error = err.error;
        console.log(error + error.message + '当前密码错误');
        alert('密码修改失败，请重新尝试!');
        }, // todo add alert
      () => {
        alert('密码修改成功');
        this.router.navigate(['/home']);
      } //
    );
  }

}
