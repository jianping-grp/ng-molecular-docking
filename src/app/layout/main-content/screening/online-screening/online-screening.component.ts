import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {RestService} from '../../../../service/rest/rest.service';

@Component({
  selector: 'app-online-screening',
  templateUrl: './online-screening.component.html',
  styleUrls: ['./online-screening.component.css']
})
export class OnlineScreeningComponent implements OnInit {
  screeningForm: FormGroup;
  formData = new FormData();
  pdbTargetFile: File;
  userDbFile: File;
  currentUser: any;
  // public uploader: FileUploader = new FileUploader({
  //   url: `${environment.REST_HOST}/bulk-target-prediction/`, // todo modify
  //   method: 'POST',
  //   itemAlias: 'pdb_file'
  // });

  constructor(private fb: FormBuilder,
              private router: Router,
              private rest: RestService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.screeningForm = this.fb.group({
      work_name: ['', [Validators.required]],
      work_decs: ['', [Validators.required]],
      mol_db: ['zinc', [Validators.required]],
      Size_x: ['', [Validators.required]],
      Size_y: ['', [Validators.required]],
      Size_z: ['', [Validators.required]],
      Center_x: ['', [Validators.required]],
      Center_y: ['', [Validators.required]],
      Center_z: ['', [Validators.required]],
      // pdbFile: ['', [Validators.required]]
    });

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = storedUser;
  }


  onSubmit(): void {
    // 判断是否纯在文件以及文件的格式是否是pdb格式；
    if (this.screeningForm.value.mol_db === 'userDb') {
      if (!this.userDbFile || !this.isPdbFile(this.userDbFile)) {
        alert('请上传pdb格式的文件!');
      }
    }

    if (!this.pdbTargetFile || !this.isPdbFile(this.pdbTargetFile)) {
      alert('请上传pdb格式文件！');
    } else {
      // 判断screeningForm表单验证是否全部通过;
      if (this.screeningForm.invalid) {
        for (const i in this.screeningForm.controls) {
          this.screeningForm.controls[i].markAsDirty();
          this.screeningForm.controls[i].updateValueAndValidity();
        }
      } else {
        // console.log(value);
        // this.uploaderFile();
        this.formSubmit();
      }
    }
  }


  fileChange($event) {
    console.log($event);
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      alert('文件读取完成');
      const resuleFile = e.target['result'];
      console.log(resuleFile);
      console.log('e:', e);
    };
    reader.readAsDataURL(file);
    // reader.readAsText(file);
  }

  pdbTargetFileChange(event) {
    this.pdbTargetFile = event.target.files[0];
    if (this.isPdbFile(this.pdbTargetFile)) {
      alert('请上传pdb格式的文件！');
    }
  }

  userDbFileChange(event) {
    this.userDbFile = event.target.files[0];
    if (this.isPdbFile(this.userDbFile)) {
      alert('请上传pdb格式的文件！');
    }
  }

  isPdbFile(file: File) {
    const reg = /\.pdb$/;
    const isPdbFormat = reg.test(file.name);
    return isPdbFormat;
  }

  formSubmit() {
    const form = this.screeningForm.value;
    if (form.mol_db === 'userDb') {
      this.formData.append('user_db', this.userDbFile);
    } else {
      this.formData.append('mol_db', form.mol_db);
    }
    this.formData.append('work_name', form.work_name);
    this.formData.append('work_desc', form.work_decs);
    this.formData.append('size_x', form.size_x);
    this.formData.append('size_y', form.size_y);
    this.formData.append('size_z', form.size_z);
    this.formData.append('center_x', form.center_x);
    this.formData.append('center_y', form.center_y);
    this.formData.append('center_z', form.center_z);
    this.formData.append('pdb_file', this.pdbTargetFile);
    this.rest.postData(`virtualscreenorders/`, this.formData)
      .subscribe((res: Response) => {
          const temsRes = res;
          if (temsRes) {
            alert('任务提交成功!');
          }
        },
        error2 => {
          alert('任务提交失败，请重新尝试！');
        }
      );
  }

  // uploaderFile() { // 文件上传到后台服务器
  //   this.uploader.setOptions({
  //     additionalParameter: this.screeningFormDate
  //   });
  //   console.log(this.uploader); // todo delete
  //   this.uploader.queue[0].onSuccess = function (response, status, headers) {
  //     if (status === 200) {
  //       const temRes = JSON.parse(response);
  //       console.log('response', temRes);
  //       alert('任务提交成功！');
  //     } else {
  //       alert('任务提交失败，请重新尝试!');
  //     }
  //   };
  //   this.uploader.queue[0].upload();
  //   // this.rebuildForm(); // todo 添加页面跳转;
  // }



  openSnackBar() {
    if (this.currentUser) { return; }
    this.snackBar.open('', '温馨提示： 请登陆后提交任务！', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
