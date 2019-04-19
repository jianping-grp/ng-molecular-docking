import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../service/rest/rest.service';
import {MatSnackBar} from '@angular/material';
import {SeaTarget} from '../../../../models/sea-target';

@Component({
  selector: 'app-online-screening2',
  templateUrl: './online-screening2.component.html',
  styleUrls: ['./online-screening2.component.css']
})
export class OnlineScreening2Component implements OnInit {

  screeningForm2: FormGroup;
  targetFile: File; // 受体文件
  residuesFile: File; // 残基文件
  seaTargets: SeaTarget[];
  currentUser: any;
  constructor(private rest: RestService,
              private fb: FormBuilder,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.screeningForm2 = this.fb.group({
      work_name: ['', [Validators.required]],
      work_decs: ['', [Validators.required]],
      mol_db: ['zinc', [Validators.required]],
      target_select: ['', [Validators.required]] // 先做样式，后面修改
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

  targetFileChange(event) {
    this.targetFile = event.target.files[0];
    if (!this.isPdbFile(this.targetFile)) {
      alert('请上传pdb格式的文件！');
    }
  }

  residuesFileChange(event) {
    this.residuesFile = event.target.files[0];
    if (!this.isPdbFile(this.targetFile)) {
      alert('请上传pdb格式的文件！');
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

  onSubmit() {
    if (!this.currentUser) {
      this.openSnackBar();
      return;
    }

    if (!this.targetFile || !this.isPdbFile(this.targetFile)) {
      alert('请上传pdb格式的文件!');
    } else if (!this.residuesFile || !this.isPdbFile(this.residuesFile)) {
      alert('请上传pdb格式的文件！');
    }  else {
      // 表单验证通过上传文件
      if (this.screeningForm2.invalid) {
        for (const i in this.screeningForm2.controls) {
          this.screeningForm2.controls[i].markAsDirty();
          this.screeningForm2.controls[i].updateValueAndValidity();
        }
      } else {
        this.formSubmit();
      }
    }
  }

  formSubmit() { //
    const form = this.screeningForm2.value;
    const formData = new FormData();
    formData.append('work_name', form['work_name']);
    formData.append('work_decs', form['work_decs']);
    formData.append('mol_db', form['mol_db']);
    formData.append('target', form['target_select']);
    formData.append('target_select', form['target_select']);
    formData.append('pdb_file', this.targetFile);
    formData.append('resi_file', this.residuesFile);
    this.rest.postData(`virtualscreen2s/`, formData)
      .subscribe((res: Response) => {
          // console.log('docking2Response:', res);
          alert('任务提交成功!');
        },
        error2 => {
          // console.log('screeningError2:', error2);
          alert(`${error2['error']['work_name'] ? error2['error']['work_name'] : '任务提交失败，请重新尝试！'}`);
        },
        () => {
        this.screeningForm2.reset();
        // todo add router
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
