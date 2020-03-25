import { Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ExperimentModel} from '../../models/ExperimentModel';
import {ServerModel} from '../../models/ServerModel';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { getUpdateExperimentUrl} from '../ExperimentUrl';
import {LogModel} from '../../models/LogModel';
import DataModel from "../../models/DataModel";
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

  newLogTitle: string = "Log titel";
  newLogDescription: string = "Log omschrijving";

  constructor(public activeModal: NgbActiveModal, private http: HttpClient, private popupService: PopupService) { }

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

  fetchLogRows(){
    let url = this.configureDowloadUrl();

    const httpOptions = {
      headers: new HttpHeaders({
        'token': DataModel.account.token
      })
    };

    this.http.get<LogModel[]>(
      url, httpOptions).subscribe(responseData => {
          this.dataFromServer = responseData;
        }, error => {
        this.handleError(error);
      }
      )
  }

  configureDowloadUrl(){
    let host = ServerModel.host;
    let port = ServerModel.port;
    let url = "http://" + host + ":" + port + "/log/download/" + this.experiment_id;
    return url
  }

  configureUploadUrl(){
    let host = ServerModel.host;
    let port = ServerModel.port;

    let url = "http://" + host + ":" + port + "/log/upload";
    return url;
  }

  uploadLog(){
    let logModel = new LogModel();

    logModel.title = this.newLogTitle;
    logModel.description = this.newLogDescription;
    logModel.experiment_id = this.experiment_id;

    this.http.post(this.configureUploadUrl(), logModel,
      {
        headers: new HttpHeaders({
          "Accept": "application/json",
          "Content-Type": "application/json",
          'token': DataModel.account.token
        })

      }).subscribe(responsData => {
      this.dataFromServerOnUpload = responsData;
      this.fetchLogRows();
    }, error => {
      this.handleError(error);
    });
  }

  updateProject() {
    console.log(this.newLogTitle)

    let data =  JSON.stringify({
      "id": this.experiment_id,
      "name": this.experiment_name,
      "description": this.experiment_description,
      "experimentleaders": this.experiment_leader,
      "fasens": this.experiment_phase,
      "statussen": this.experiment_status,
      "businessOwners": this.business_owner,
      "inovation_cost": this.inovation_cost,
      "money_source": this.money_source,
      "organisations": this.organisation
    });
    console.log(data);

    this.http.post(getUpdateExperimentUrl(), data,
      {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': DataModel.account.token
        })
      }).subscribe(
      responseData => {
        this.dataFromServerUpdate = responseData;
        console.log(responseData);
      }, error => {
        this.handleError(error);
      });
    this.fetchLogRows();
  }

  private handleError(error: any) {
    switch (error.status) {
      case 400:
        this.popupService.dangerPopup("Er ging iets mis, probeer het later nog een keer.");
        break;
      case 401:
        this.popupService.dangerPopup("U heeft niet de juiste rechten voor deze bewerking.");
        break;
      case 500:
        this.popupService.dangerPopup("Er ging iets mis, probeer het later nog een keer.");
        break;
    }
  }
}
