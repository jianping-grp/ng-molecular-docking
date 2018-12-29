import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../../../environments/environment';
import {assertLessThan} from '@angular/core/src/render3/assert';
import {RestService} from '../../../../service/rest/rest.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-online-docking',
  templateUrl: './online-docking.component.html',
  styleUrls: ['./online-docking.component.css']
})
export class OnlineDockingComponent implements OnInit {
  dockingForm: FormGroup;
  dockingFormDate: object = {user: 1};
  pdbTargetFile: File;
  mol2File: File;
  formData = new FormData();
  currentUser: any;
  public uploader: FileUploader = new FileUploader({
    url: `${environment.REST_HOST}/autoducts/`, // todo modify
    method: 'POST',
    itemAlias: 'pdb_file'
  });

  constructor(private fb: FormBuilder,
              private rest: RestService,
              private router: Router,
              public snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.dockingForm = this.fb.group({
      work_name: ['', [Validators.required]],
      work_decs: ['', [Validators.required]],
      //mol_db: ['', [Validators.required]],
      size_x: ['', [Validators.required]],
      size_y: ['', [Validators.required]],
      size_z: ['', [Validators.required]],
      center_x: ['', [Validators.required]],
      center_y: ['', [Validators.required]],
      center_z: ['', [Validators.required]],
      // pdbFile: ['', [Validators.required]]
    });
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = storedUser;
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

  mol2FileChange(event) {
    this.mol2File = event.target.files[0];
    if (!this.isMol2File(this.mol2File)) {
      alert('请上传mol2格式的文件！');
    }
  }

  isPdbFile(file: File) {
    const reg = /\.pdb$/;
    const isPdbFormat = reg.test(file.name);
    return isPdbFormat;
  }

  isMol2File(file: File) {
    const reg = /\.mol2$/;
    const isMol2Format = reg.test(file.name);
    return isMol2Format;
  }

  submitForm($event, value): void {
    // 用户未登录时提示登录
    if (!this.currentUser) {
      this.openSnackBar();
      return;
    }

    // 判断是否纯在文件以及文件的格式是否是pdb格式；
    if (!this.pdbTargetFile || !this.isPdbFile(this.pdbTargetFile)) {
      alert('请上传pdb格式的文件！');
    } else if (!this.mol2File || !this.isMol2File(this.mol2File)) {
      alert('请上传mol2格式的文件！');
    } else {
      //  判断dockingForm表单验证是否全部通过;
      if (this.dockingForm.invalid) {
        for (const i in this.dockingForm.controls) {
          this.dockingForm.controls[i].markAsDirty();
          this.dockingForm.controls[i].updateValueAndValidity();
        }
      } else {
        // Object.assign(this.dockingFormDate, value);
        console.log('dockingForm:', value);
        this.uploaderFile();
      }
    }
  }

  uploaderFile() {
    const form = this.dockingForm.value;
    this.formData.append('work_name', form.work_name);
    this.formData.append('work_desc', form.work_decs);
    this.formData.append('size_x', form.size_x);
    this.formData.append('size_y', form.size_y);
    this.formData.append('size_z', form.size_z);
    this.formData.append('center_x', form.center_x);
    this.formData.append('center_y', form.center_y);
    this.formData.append('center_z', form.center_z);
    this.formData.append('pdb_file', this.pdbTargetFile);
    this.formData.append('lig_file', this.mol2File); // todo mol2 file modify

    this.rest.postData(`autodocts/`, this.formData)
      .subscribe(data => {
        const res = data;
        console.log(res);
        alert('任务提交成功！');  // todo add document
      },
        error2 => {
        console.log(error2.message);
        alert('任务提交失败！'); // todo add
        },
        () =>  {
        //  todo add router
          this.dockingForm.reset();
        });
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

  // uploaderFile() { // 文件上传到后台服务器
  //   this.uploader.setOptions({
  //     additionalParameter: this.dockingFormDatedockingF
  //   });！
  //   console.log(this.uploader); // todo delete
  //   this.uploader.queue[0].onSuccess = function (response, status, headers) {
  //     console.log('status:', status);
  //     if (status === 201 || status === 200) {
  //       const temRes = JSON.parse(response);
  //       console.log('response', temRes);
  //       alert('任务提交成功!');
  //     } else {
  //       alert('任务提交失败，请重新尝试!');
  //     }
  //   };
  //   this.uploader.queue[0].onError = function (response, status) {
  //     console.log('errorStatus:', status);
  //     console.log('errorResponse:', response);
  //     alert('任务提交失败!');
  //   };
  //   this.uploader.queue[0].upload();
  //   // this.rebuildForm(); // todo 添加页面跳转;
  // }


}
