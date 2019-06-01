import {Component, OnInit} from '@angular/core';
import {Gbsa} from '../../../../models/new-disign-models/gbsa';
import {RestService} from '../../../../service/rest/rest.service';

@Component({
  selector: 'app-mm-gbsa',
  templateUrl: './mm-gbsa.component.html',
  styleUrls: ['./mm-gbsa.component.css']
})
export class MmGbsaComponent implements OnInit {
  proteinFile: File;
  ligandFile: File;
  complexFile: File;
  gbsa: Gbsa = {
    work_name: '',
    pdb_file: '',
    lig_file: '',
    complex_file: '',
    email: '',
    status: '',
    add_time: '',
  };

  constructor(private rest: RestService) {
  }

  ngOnInit() {
  }

  proteinFileChange(event) {
    this.proteinFile = event.target.files[0];
  }

  ligandsFileChange(event) {
    this.ligandFile = event.target.files[0];
  }

  complexFileChange(event) {
    this.complexFile = event.target.files[0];
  }

  onSubmit(newGbsaForm: any) {
    console.log('gbsaForm', newGbsaForm);
    const form = newGbsaForm.value;
    const formData = new FormData();

    formData.append('pdb_file', this.proteinFile);
    formData.append('lig_file', this.ligandFile);
    formData.append('complex_file', this.complexFile);
    formData.append('work_name', form.work_name);
    formData.append('email', form.email);
    formData.append('resn', form.resn);

    this.rest.postData('gbsa/', formData)
      .subscribe(data => {
          console.log('newGbsaResponse:', data);
          alert('任务提交成功！');
        },
        error2 => {
          console.log('error', error2);
          alert('任务提交失败！');
        },
        () => {
          newGbsaForm.reset();
        });
  }
}
