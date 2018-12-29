import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../service/rest/rest.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-online-screening2',
  templateUrl: './online-screening2.component.html',
  styleUrls: ['./online-screening2.component.css']
})
export class OnlineScreening2Component implements OnInit {

  screeningForm2: FormGroup;
  targetFile: File;
  ligandFile: File;
  currentUser: any;
  userDbFile: File;
  formData = new FormData();
  constructor(private rest: RestService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.screeningForm2 = this.fb.group({
      work_name: ['', [Validators.required]],
      work_decs: ['', [Validators.required]],
      mol_db: ['zinc', [Validators.required]],
    });

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = storedUser;
  }

  targetFileChange(event) {
    this.targetFile = event.target.files[0];
    if (!this.isPdbFile(this.targetFile)) {
      alert('请上传pdb格式的文件！');
    }
  }

  userDbFileChange(event) {
    this.userDbFile = event.target.files[0];
    if (!this.isPdbFile(this.userDbFile)) {
      alert('请上传pdb格式的文件！');
    }
  }

  isPdbFile(file: File) {
    const reg = /\.pdb$/;
    const isPdbFormat = reg.test(file.name);
    return isPdbFormat;
  }

  ligandFileChange(event) {
    this.ligandFile = event.target.files[0];
    if (!this.isPdbFile(this.targetFile)) {
      alert('请上传pdb格式的文件！');
    }
  }

  onSubmit() {
    // 用户未陆陆,提醒用户登录
    if (!this.currentUser) {
      this.openSnackBar();
      return;
    }
    // 判断是否纯在文件以及文件的格式是否是pdb格式；
    if (this.screeningForm2.value.mol_db === 'userDb') {
      if (!this.userDbFile || !this.isPdbFile(this.userDbFile)) {
        alert('请上传pdb格式的文件!');
      }
    }

    if (!this.targetFile || !this.ligandFile) {
      alert('请上传pdb格式的文件!');
    } else if (!this.isPdbFile(this.targetFile) || !this.isPdbFile(this.ligandFile)) {
      alert('请上传pdb格式的文件！');
    } else {
      // 表单验证通过上传文件
      if (this.screeningForm2.invalid) {
        for (const i in this.screeningForm2.controls) {
          this.screeningForm2.controls[i].markAsDirty();
          this.screeningForm2.controls[i].updateValueAndValidity();
        }
      } else {
        // 传传文件
        this.formSubmit();
      }
    }
  }

  formSubmit() {
    const form = this.screeningForm2.value;
    if (form.mol_db === 'userDb') {
      this.formData.append('user_db', this.userDbFile);
      //this.formData.append('mol_db', 'user_db_file');
    } else {
      this.formData.append('mol_db', form['mol_db']);
      //this.formData.append('user_db', null);
    }
    this.formData.append('work_name', form['work_name']);
    this.formData.append('work_decs', form['work_decs']);
    this.formData.append('pdb_file', this.targetFile);
    this.formData.append('resi_file', this.ligandFile);
    console.log('formdata:', this.formData, 'form:', form,this.formData.getAll('mol_db'));
    this.rest.postData(`virtualscreen2s/`, this.formData)
      .subscribe((res: Response) => {
          const temsRes = res;
          if (temsRes) {
            alert('任务提交成功!');
          }
        },
        error2 => {
          alert('任务提交失败，请重新尝试！');
        },
        () => {
          this.screeningForm2.reset();
        }
      );
  }

  openTooltip() {
    if (this.currentUser) { return; }
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open('', '温馨提示： 请登陆后提交任务！', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

}
