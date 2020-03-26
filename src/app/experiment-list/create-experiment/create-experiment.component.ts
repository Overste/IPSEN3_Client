import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {getCreateExperimentUrl} from '../ExperimentUrl';
import {NgForm} from '@angular/forms';
import DataModel from '../../models/DataModel';
import {PopupService} from '../../popup.service';

@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.css']
})
export class CreateExperimentComponent {
  dataFromServer: any;
  id: number;
  name: string;
  description: string;
  fasens: string;
  statussen: string;
  experimentleaders: string;
  organisations: string;
  businessOwners: string;
  inovation_cost: number;
  money_source: string;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private popupService: PopupService) { }

  async onSubmit(form: NgForm) {
    const data = form.value;

    if (!this.checkEmptiness(data)) {
      this.http.post(getCreateExperimentUrl(), data,
        {
          headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: DataModel.account.token
          })
        }).subscribe(
        responseData => {
          this.dataFromServer = responseData;
          this.popupService.succesPopup('Experiment succesvol aangemaakt!');
        }
      );
    }
    this.activeModal.close();
  }

  checkEmptiness(data: any) {
    for (const key in data) {
      const value = data[key];
      if (value === '' || value === undefined) {
        return true;
      }
    }
    return false;
  }
}
