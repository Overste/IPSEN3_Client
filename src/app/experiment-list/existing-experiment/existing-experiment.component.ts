import { Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ExperimentModel} from '../../models/ExperimentModel';
import {ServerModel} from '../../models/ServerModel';
import {AccountModel} from '../../models/AccountModel';
import * as url from 'url';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {getCreateExperimentUrl, getExperimentUrl, getUpdateExperimentUrl} from '../ExperimentUrl';
import {LogModel} from '../../models/LogModel';
import {log} from 'util';
import DataModel from "../../models/DataModel";
import {NgForm} from "@angular/forms";

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

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) {
  }

  ngOnInit() {

    this.fetchLogRows();
  }

  fetchLogRows() {
    let url = this.configureDowloadUrl();

    this.http.get<LogModel[]>(
      url).subscribe(responseData => {
        console.log(responseData
        );
        this.dataFromServer = responseData;
      }
    )
  }

  configureDowloadUrl() {
    let host = ServerModel.host;
    let port = ServerModel.port;
    let token = DataModel.account.token;
    let url = "http://" + host + ":" + port + "/log/" + token + " /download/" + this.experiment_id;
    return url
  }

  configureUploadUrl() {
    let host = ServerModel.host;
    let port = ServerModel.port;
    let token = DataModel.account.token;

    let url = "http://" + host + ":" + port + "/log/" + token + "/upload/";
    return url;
  }

  uploadLog() {
    let logModel = new LogModel();

    logModel.title = this.newLogTitle;
    logModel.description = this.newLogDescription;
    logModel.experiment_id = this.experiment_id;

    this.http.post(this.configureUploadUrl(), logModel,
      {
        headers: new HttpHeaders({
          "Accept": "application/json",
          "Content-Type": "application/json"
        })

      }).subscribe(responsData => {
      this.dataFromServerOnUpload = responsData;
      this.fetchLogRows();
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
          'Content-Type': 'application/json'
        })
      }).subscribe(
      responseData => {
        this.dataFromServerUpdate = responseData;
        console.log(responseData);
      }
    )
    this.fetchLogRows();
  }
}
