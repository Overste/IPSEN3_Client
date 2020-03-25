import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {getExperimentUrl} from "./ExperimentUrl";
import {ExperimentModel} from "../models/ExperimentModel";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateExperimentComponent} from "./create-experiment/create-experiment.component";
import {ExistingExperimentComponent} from './existing-experiment/existing-experiment.component';
import {deleteExperiment} from "../services/experiment";
import {PopupService} from "../popup.service";
import DataModel from '../models/DataModel';
import {Router} from '@angular/router';
import {FilterService } from "../filter.service";
import {UserPermissionService} from '../services/user-permission-service';

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css'],
})

export class ExperimentListComponent implements OnInit {
  dataFromServer: any;
  canEdit = false;

  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private modalService: NgbModal,
    private router: Router,
    private permissionService: UserPermissionService,
    public filterService: FilterService) {
  }

  showExperiments() {
    const httpOptions =  {
      headers: new HttpHeaders({
        'token': DataModel.account.token
      })
    };
    this.http.get<ExperimentModel[]>(
      getExperimentUrl(), httpOptions)
      .subscribe(
        responseData => {
          this.filterService.isDataSet.next(responseData)
        }
      )
  }

  ngOnInit() {
    if(DataModel.account.token == null) {
      this.popupService.dangerPopup("U bent nog niet ingelogd.");
      this.router.navigate(['/']);
    } else {
      var self = this;
      this.permissionService.initialize(function() {
        self.canEdit = self.permissionService.hasSuperPermissions();
      });
      this.showExperiments();
    }
  }

  deleteExperiment(experiment : ExperimentModel) {
    this.popupService.showConfirmPopup(experiment.experiment_name).then(
      () => {
        const headers =  new HttpHeaders().set('token', DataModel.account.token);

        this.http.delete(
          deleteExperiment(experiment.experiment_id),
          {responseType: 'text', headers}
        ).subscribe(() => {
            this.showExperiments();
            this.popupService.succesPopup(
              experiment.experiment_name + ' is succesvol verwijderd!'
            );
        }, error => {
          this.handleError(error);
        });
      }
    )
  }

  openExistingExperiment(model: ExperimentModel){
    const modal = this.modalService.open(ExistingExperimentComponent, { windowClass : "myCustomModalClass"});
    modal.componentInstance.model = model;
  }

  openCreateExperiment() {
    const modalRef = this.modalService.open(CreateExperimentComponent, { windowClass : "myCustomModalClass"});
    modalRef.result.then( () => this.showExperiments() );
  }

  private handleError(error: any) {
    switch (error.status) {
      case 401:
        this.popupService.dangerPopup("U heeft niet de juiste rechten.");
        break;
      case 400:
        this.popupService.dangerPopup("We konden u identiteit niet valideren, neem contact op met de systeembeheerder.");
      case 500:
        this.popupService.dangerPopup("Er ging iets mis, probeer het later nog eens.");
    }
  }
}
