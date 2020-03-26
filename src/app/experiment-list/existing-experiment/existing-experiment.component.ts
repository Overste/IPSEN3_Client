import { Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ExperimentModel} from '../../models/ExperimentModel';
import {HttpClient} from '@angular/common/http';
import {LogModel} from '../../models/LogModel';
import {LogService} from '../../log.service';
import {ExperimentService} from '../../experiment.service';
import {PopupService} from '../../popup.service';

@Component({
  selector: 'app-existing-experiment-component',
  templateUrl: './existing-experiment.component.html',
  styleUrls: ['./existing-experiment.component.css']
})
export class ExistingExperimentComponent implements OnInit {
  @Input() model: ExperimentModel;

  dataFromServer: LogModel[];
  dataFromServerOnUpload: any;
  dataFromServerUpdate: any;

  experiment_name: string;
  experiment_description: string;
  business_owner: string;
  experiment_id: number;
  experiment_leader: string;
  experiment_phase: string;
  experiment_status: string;
  inovation_cost: number;
  money_source: string;
  organisation: string;

  newLogTitle = '';
  newLogDescription = '';

  // private experimentFases = {
  //   idea: 'Idee',
  //   labin: 'Het lab in',
  //   labout: 'Het lab uit',
  //   freezer: 'Gepauzeerd',
  //   halloffame: 'Succesvol afgerond',
  //   graveyard: 'Niet succesvol afgerond',
  //   fixedservices: 'Vaste dienst'
  // };

  experimentFases = [
    'Idee',
    'Het lab in',
    'Het lab uit',
    'Gepauzeerd',
    'Succesvol afgerond',
    'Niet succesvol afgerond',
    'Vaste dienst'
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient,
    private popupService: PopupService,
    private logService: LogService,
    private experimentService: ExperimentService
  ) { }

  ngOnInit() {
    this.business_owner = this.model.business_owner;
    this.experiment_description = this.model.experiment_description;
    this.experiment_id = this.model.experiment_id;
    this.experiment_leader = this.model.experiment_leader;
    this.experiment_name = this.model.experiment_name;
    this.experiment_phase = this.model.experiment_phase;
    this.experiment_status = this.model.experiment_status;
    this.inovation_cost = this.model.inovation_cost;
    this.money_source = this.model.money_source;
    this.organisation = this.model.organisation;

    this.fetchLogRows();
  }

  fetchLogRows() {
    this.logService.fetchLogRows(this.experiment_id).subscribe(
      responseData => {
        this.dataFromServer = responseData;
      },
    error => {
      this.experimentService.handleError(error);
    });
  }

  uploadLog() {
    const logModel = new LogModel();

    logModel.title = this.newLogTitle;
    logModel.description = this.newLogDescription;
    logModel.experiment_id = this.experiment_id;

    this.logService.uploadLog(logModel).subscribe(responsData => {
      this.dataFromServerOnUpload = responsData;
      this.fetchLogRows();
    }, error => {
      this.experimentService.handleError(error);
    });
  }

  updateProject() {
    const data =  JSON.stringify({
      id: this.experiment_id,
      name: this.experiment_name,
      description: this.experiment_description,
      experimentleaders: this.experiment_leader,
      fasens: this.experiment_phase,
      statussen: this.experiment_status,
      businessOwners: this.business_owner,
      inovation_cost: this.inovation_cost,
      money_source: this.money_source,
      organisations: this.organisation
    });

    this.experimentService.updateExperiment(data).subscribe(
      responseData => {
        this.dataFromServerUpdate = responseData;
      }, error => {
        this.activeModal.close();
        this.popupService.succesPopup('Succesvol geüpdatet!');
        this.experimentService.showExperiments();
        // this.experimentService.handleError(error);
      }
    );
    this.fetchLogRows();
  }
}
