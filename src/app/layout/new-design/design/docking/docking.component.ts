import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NewDocking} from '../../../../models/new-disign-models/new-docking';
import {RestService} from '../../../../service/rest/rest.service';

@Component({
  selector: 'app-docking',
  templateUrl: './docking.component.html',
  styleUrls: ['./docking.component.css']
})
export class DockingComponent implements OnInit {
  // dockingForm: FormGroup;
  proteinFile: File;
  ligandFile: File;
  referenceLigandFile: File;
  gpd = ''; // Grid Parameters define
  style = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };
  dockingModel: NewDocking = {
    work_name: '',
    algorithm: 'AutoDock',
    size_x: '',
    size_y: '',
    size_z: '',
    center_x: '',
    center_y: '',
    center_z: '',
    resn: '',
    pdb_file: '',
    lig_file: '',
    reference_file: '',
    status: '',
    out_path: '',
    affinity: '',
    email: '',
    user: '',
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

  referenceLigandFileChange(event) {
    this.referenceLigandFile = event.target.files[0];
  }

  onSubmit(dockingForm: any) {
    console.log('dockingForm', dockingForm.value);
    const form = dockingForm.value;
    const formData = new FormData();
    formData.append('pdb_file', this.proteinFile);
    formData.append('lig_file', this.ligandFile);
    formData.append('work_name', form.work_name);
    formData.append('algorithm', form.algorithm);
    formData.append('email', form.email);

    switch (this.gpd) {
      case 'residue':
        formData.append('resn', form.resn);
        break;
      case 'Grid-center':
        formData.append('size_x', form.size_x);
        formData.append('size_y', form.size_y);
        formData.append('size_z', form.size_z);
        formData.append('center_x', form.center_x);
        formData.append('center_y', form.center_y);
        formData.append('center_z', form.center_z);
        break;
      case 'referenceLigand':
        formData.append('reference_file', this.referenceLigandFile);
    }

    this.rest.postData('docks/', formData)
      .subscribe(data => {
        console.log('newdockingResponse:', data);
        alert('任务提交成功！');
      },
        error2 => {
        console.log('error', error2);
        alert('任务提交失败！');
        },
        () => {
          dockingForm.reset();
        });
  }


}
