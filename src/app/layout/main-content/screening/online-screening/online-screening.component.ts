import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-online-screening',
  templateUrl: './online-screening.component.html',
  styleUrls: ['./online-screening.component.css']
})
export class OnlineScreeningComponent implements OnInit {
  dockingForm: FormGroup;
  dockingFormDate: object;
  pdbTargetFile: File;
  public uploader: FileUploader = new FileUploader({
    url: `${environment.REST_HOST}/bulk-target-prediction/`, // todo modify
    method: 'POST',
    itemAlias: 'pdb_file'
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dockingForm = this.fb.group({
      work_name: ['', [Validators.required]],
      work_decs: ['', [Validators.required]],
      mol_db: ['zinc', [Validators.required]],
      target_select: ['CHEMBL1075021', [Validators.required]], // todo 先做样式，后面修改
      Size_x: ['', [Validators.required]],
      Size_y: ['', [Validators.required]],
      Size_z: ['', [Validators.required]],
      Center_x: ['', [Validators.required]],
      Center_y: ['', [Validators.required]],
      Center_z: ['', [Validators.required]],
      // pdbFile: ['', [Validators.required]]
    });
  }


  submitForm($event, value): void {
    // 判断是否纯在文件以及文件的格式是否是pdb格式；
    if (!this.pdbTargetFile || this.isPdbFile(this.pdbTargetFile)) {
      alert('请上传pdb格式文件！');
    } else {
      // 判断dockingForm表单验证是否全部通过;
      if (this.dockingForm.invalid) {
        for (const i in this.dockingForm.controls) {
          this.dockingForm.controls[i].markAsDirty();
          this.dockingForm.controls[i].updateValueAndValidity();
        }
      } else {
        Object.assign(this.dockingFormDate, value);
        // console.log(value);
        this.uploaderFile();
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

  isPdbFile(file: File) {
    const reg = /\.pdb$/;
    const isPdbFormat = reg.test(file.name);
    return isPdbFormat;
  }

  uploaderFile() { // 文件上传到后台服务器 TODO
    this.uploader.setOptions({
      additionalParameter: this.dockingFormDate
    });
    console.log(this.uploader); // todo delete
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      if (status === 200) {
        const temRes = JSON.parse(response);
        console.log('response', temRes);
        alert('任务提交成功！');
      } else {
        alert('任务提交失败，请重新尝试!');
      }
    };
    this.uploader.queue[0].upload();
    // this.rebuildForm(); // todo 添加页面跳转;
  }


}
