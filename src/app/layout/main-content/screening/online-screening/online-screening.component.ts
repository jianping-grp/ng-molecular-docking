import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {RestService} from '../../../../service/rest/rest.service';
import {SeaTarget} from '../../../../models/sea-target';

@Component({
  selector: 'app-online-screening',
  templateUrl: './online-screening.component.html',
  styleUrls: ['./online-screening.component.css']
})
export class OnlineScreeningComponent implements OnInit {
  screeningForm: FormGroup;
  pdbTargetFile: File;
  userDbFile: File;
  currentUser: any;
  seaTargets: SeaTarget[];
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
      target_select: ['', [Validators.required]],
      Size_x: ['', [Validators.required]],
      Size_y: ['', [Validators.required]],
      Size_z: ['', [Validators.required]],
      Center_x: ['', [Validators.required]],
      Center_y: ['', [Validators.required]],
      Center_z: ['', [Validators.required]],
      // pdbFile: ['', [Validators.required]]

    });
    this.getSeaTarget();

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = storedUser;
  }

  getSeaTarget() {
    this.rest.getData('targets/').subscribe(data => {
      this.seaTargets = data;
    });
  }

  onSubmit(): void {
    // 用户未录录示示陆陆
    if (!this.currentUser) {
      this.openSnackBar();
      return;
    }
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
        // 上传文件
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
    if (!this.isPdbFile(this.pdbTargetFile)) {
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

  formSubmit() {
    const form = this.screeningForm.value;
    const formData = new FormData();
    if (form.mol_db === 'userDb') {
      formData.append('user_db', this.userDbFile);
    } else {
      formData.append('mol_db', form['mol_db']);
    }
    formData.append('work_name', form.work_name);
    formData.append('work_desc', form.work_decs);
    formData.append('target', form.target_select);
    formData.append('size_x', form.Size_x);
    formData.append('size_y', form.Size_y);
    formData.append('size_z', form.Size_z);
    formData.append('center_x', form.Center_x);
    formData.append('center_y', form.Center_y);
    formData.append('center_z', form.Center_z);
    formData.append('pdb_file', this.pdbTargetFile);
    this.rest.postData(`virtualscreens/`, formData)
      .subscribe((res: Response) => {
          const temsRes = res;
          if (temsRes) {
            alert('任务提交成功!');
          }
        },
        error2 => {
          // console.log('error2', error2);
          alert(`${error2['error']['work_name'] ? error2['error']['work_name'] : '任务提交失败，请重新尝试！'}`);
          // alert('任务提交失败，请重新尝试！');
        },
        () => {
          this.screeningForm.reset();
          // todo add router
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

  openTooltip() {
    if (this.currentUser) { return; }
    this.openSnackBar();
  }

  openSnackBar() {
    if (this.currentUser) { return; }
    this.snackBar.open('', '温馨提示： 请登陆后提交任务！', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
