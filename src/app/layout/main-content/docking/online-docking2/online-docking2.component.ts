import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../service/rest/rest.service';
import {MatSnackBar} from '@angular/material';

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
  currentUser: any;
  constructor(private rest: RestService,
              private fb: FormBuilder,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dockingForm2 = this.fb.group({
      work_name: ['', [Validators.required]],
      work_decs: ['', [Validators.required]],
      // zmol_db: ['', [Validators.required]],
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
    // 用户未登录时提示
    if (!this.currentUser) {
      this.openSnackBar();
      return;
    }
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
        console.log('file submit!');
        this.formSubmit();
      }
    }
  }

  formSubmit() {
    const form = this.dockingForm2.value;
    const formData = new FormData();
    formData.append('work_name', form['work_name']);
    formData.append('work_decs', form['work_decs']);
    formData.append('mol_db', form['mol_db']);
    formData.append('pdb_file', this.targetFile);
    formData.append('lig_file', this.ligandFile);
    formData.append('resi_file', this.mol2File); // todo modify mol2file
    this.rest.postData(`autodock2s/`, formData)
      .subscribe((res: Response) => {
          const temsRes = res;
          if (temsRes) {
            alert('任务提交成功!');
          }
        },
        error2 => {
          alert(`${error2['error']['work_name'] ? error2['error']['work_name'] : '任务提交失败，请重新尝试！'}`);
          // alert('任务提交失败，请重新尝试！');
        },
        () => {
        // todo add router
          this.dockingForm2.reset();
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
