import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service';
import {SeaTarget} from '../../../../models/sea-target';
import {JsmeComponent} from '../../../../shared/jsme/jsme/jsme.component';
import {Sea} from '../../../../models/new-disign-models/sea';

@Component({
  selector: 'app-sea',
  templateUrl: './sea.component.html',
  styleUrls: ['./sea.component.css']
})
export class SeaComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;
  jsmeSmiles: string;
  seaTargets: SeaTarget[];
  proteinFile: File;
  newSea: Sea = {
    work_name: '',
    mol_db: '',
    target: '',
    smiles: '',
    pdb_file: '',
    resn: '',
    status: '',
    email: '',
    add_time: '',
  };

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.jsmeSmiles = '';
    this.getSeaTarget();
  }

  proteinFileChange(event) {
    this.proteinFile = event.target.files[0];
  }

  getSeaTarget() {
    this.rest.getData('targets/').subscribe(data => {
      this.seaTargets = data;
    });
  }

  getJsmeSmiles() {
    this.jsmeSmiles = this.jsme.smiles;
  }

  onSubmit(newSeaForm: any) {
    console.log('newSea:', newSeaForm);
    const form = newSeaForm.value;
    const formData = new FormData();
    if (this.proteinFile) {
      formData.append('email', form.email);
      formData.append('pdb_file', this.proteinFile);
      formData.append('work_name', form.work_name);
      formData.append('email', form.email);
      formData.append('mol_db', form.mol_db);
      formData.append('target', form.target);
      formData.append('resn', form.resn);
    } else if (form.smiles) {
      formData.append('work_name', form.work_name);
      formData.append('email', form.email);
      formData.append('smiles', form.smiles);
    }

    this.rest.postData('virscreens/', formData)
      .subscribe(data => {
          console.log('newSEAResponse:', data);
          alert('Task Submission Successful！');
        },
        error2 => {
          console.log('error', error2);
          alert('Task Submission Failed！');
        },
        () => {
          newSeaForm.reset();
        });
  }
}
