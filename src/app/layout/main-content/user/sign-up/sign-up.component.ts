import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RestService} from '../../../../service/rest/rest.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  form = new FormData;
  constructor(private router: Router,
              private restService: RestService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/[^0-9]/)]],
      confirmPassword: ['', [Validators.required, this.confirmationValidator]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^1[345678]\d{9}$/)]],
      email: ['', [Validators.required, Validators.pattern(/\w+@\w+\.\w+/)]],
      companyName: [''],
      name: [''],
      researchDirction: ['']
    });
  }

  confirmationValidator = (control: FormControl): {[s: string]: boolean} => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.signUpForm.controls.password.value) {
      return {confirm: true, error: true };
    }
  }

  updateConfirmValidator(): void {
    setTimeout(() => {
      this.signUpForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }

  onSubmit() {
     if (this.signUpForm.invalid) {
       for (const key in this.signUpForm.controls) {
         this.signUpForm.controls[key].markAsDirty();
         this.signUpForm.controls[key].updateValueAndValidity();
       }
     } else {
       const formData = this.signUpForm.value;
       this.form.append('username', formData.userName);
       this.form.append('password', formData.password);
       this.form.append('mobile', formData.phoneNumber);
       this.form.append('email', formData.email);
       this.form.append('work_org', formData.companyName);
       this.form.append('research_dir', formData.researchDirction);
       const body = {
         // todo add
         username: formData.userName,
         password: formData.password,
         mobile: formData.phoneNumber,
         email: formData.email,
         work_org: formData.companyName,
         research_dir: formData.researchDirction,
       };
       console.log('body:', body, 'form:', this.form, 'Signup', this.signUpForm.value);
       this.restService.registry(this.form)
         .subscribe(data => {
             console.log('signIndata:', data);
             alert('注册成功');
             this.router.navigate(['/user/sign-in']);
           },
           errorRes  => {
             const error = errorRes.error;
             console.log(error);
             error.username ? alert('用户名已经存在!') : null;
             error.email ? alert('该邮箱已经被注册!') : null;
           },
           () => {}
         );
     }
       }



}
