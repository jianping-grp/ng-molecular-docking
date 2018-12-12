import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../service/rest/rest.service';

@Component({
  selector: 'app-online-screening2',
  templateUrl: './online-screening2.component.html',
  styleUrls: ['./online-screening2.component.css']
})
export class OnlineScreening2Component implements OnInit {

  screeningForm2: FormGroup;
  targetFile: File;
  ligandFile: File;
  formData = new FormData();
  constructor(private rest: RestService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.screeningForm2 = this.fb.group({
      work_name: ['', [Validators.required]],
      work_decs: ['', [Validators.required]],
      mol_db: ['', [Validators.required]],
    });
  }

  targetFileChange(event) {
    this.targetFile = event.target.files[0];
    if (!this.isPdbFile(this.targetFile)) {
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
        this.formSubmit();
      }
    }
  }

  formSubmit() {
    const form = this.screeningForm2.value;
    this.formData.append('work_name', form['work_name'].value);
    this.formData.append('work_decs', form['work_decs'].value);
    this.formData.append('mol_db', form['mol_db'].value);
    this.formData.append('pdb_file', this.targetFile);
    this.formData.append('lig_file', this.ligandFile);
    this.rest.postData(`autoduck2s/`, this.formData)
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

}
