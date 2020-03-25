import {Component, EventEmitter, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {getCreateExperimentUrl} from '../ExperimentUrl';
import {NgForm} from '@angular/forms';
import DataModel from '../../models/DataModel';
import {isEmpty} from 'rxjs/operators';
import {PopupService} from '../../popup.service';

@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.css']
})
export class CreateExperimentComponent implements OnInit {
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

  ngOnInit() {
  }

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
          this.activeModal.close();
        }, error => {
          this.handleError(error);
        }
      );
    }
  }

  private handleError(error: any) {
    switch (error.status) {
      case 400:
        this.popupService.dangerPopup("Er ging iets mis, neem contact op met de systeembeheerder.");
        break;
      case 401:
        this.popupService.dangerPopup("U heeft niet de juiste rechten voor deze bewerking, neem contact op met de systeembeheerder.");
        break;
      case 500:
        this.popupService.dangerPopup("Er ging iets mis, probeer het later nog een keer.");
    }
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
