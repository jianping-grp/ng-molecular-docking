import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../service/rest/rest.service';

@Component({
  selector: 'app-online-docking2',
  templateUrl: './online-docking2.component.html',
  styleUrls: ['./online-docking2.component.css']
})
export class OnlineDocking2Component implements OnInit {
  dockingForm2: FormGroup;
  targetFile: File;
  ligandFile: File;
  mol2File: File;
  formData = new FormData();
  constructor(private rest: RestService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.dockingForm2 = this.fb.group({
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

  ligandFileChange(event) {
    this.ligandFile = event.target.files[0];
    if (!this.isPdbFile(this.targetFile)) {
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



  onSubmit() {
    if (!this.targetFile || !this.isPdbFile(this.targetFile)) {
      alert('请上传pdb格式的文件!');
    } else if (!this.ligandFile || !this.isPdbFile(this.ligandFile)) {
      alert('请上传pdb格式的文件！');
    } else if (!this.mol2File || !this.isMol2File(this.mol2File)) {
      alert('请上传mol2格式的文件！');
    } else {
      // 表单验证通过上传文件
      if (this.dockingForm2.invalid) {
        for (const i in this.dockingForm2.controls) {
          this.dockingForm2.controls[i].markAsDirty();
          this.dockingForm2.controls[i].updateValueAndValidity();
        }
      } else {
        this.formSubmit();
      }
    }
  }

  formSubmit() {
    const form = this.dockingForm2.value;
    this.formData.append('work_name', form['work_name']);
    this.formData.append('work_decs', form['work_decs']);
    this.formData.append('mol_db', form['mol_db']);
    this.formData.append('pdb_file', this.targetFile);
    this.formData.append('lig_file', this.ligandFile);
    this.formData.append('resi_file', this.mol2File); // todo modify mol2file
    this.rest.postData(`autoduck2s/`, this.formData)
      .subscribe((res: Response) => {
          const temsRes = res;
          if (temsRes) {
            alert('任务提交成功!');
          }
        },
        error2 => {
          console.log(error2.message);
          alert('任务提交失败，请重新尝试！');
        },
        () => {
        // todo add router
        }
      );
  }
}
