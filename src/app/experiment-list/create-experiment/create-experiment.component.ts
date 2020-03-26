import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {PopupService} from '../../popup.service';
import {ExperimentService} from '../../experiment.service';

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

  constructor(
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    private popupService: PopupService,
    private experimentService: ExperimentService
  ) { }

  async onSubmit(form: NgForm) {
    const data = form.value;
    if (!this.checkEmptiness(data)) {
      this.experimentService.createExperiment(data)
      .subscribe(
        responseData => {
          // this.dataFromServer = responseData;
          // this.popupService.succesPopup('Experiment succesvol aangemaakt!');
          // this.activeModal.close();
        }, error => {
          this.activeModal.close();
          this.popupService.succesPopup('Succesvol geüpdatet!');
          this.experimentService.showExperiments();
          // this.experimentService.handleError(error);
        }
      );
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
