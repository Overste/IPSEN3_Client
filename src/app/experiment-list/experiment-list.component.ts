import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {getExperimentUrl} from "./ExperimentUrl";
import {deleteExperiment} from './ExperimentUrl';
import {ExperimentModel} from '../models/ExperimentModel';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateExperimentComponent} from './create-experiment/create-experiment.component';
import {ExistingExperimentComponent} from './existing-experiment/existing-experiment.component';
import {PopupService} from '../popup.service';
import DataModel from '../models/DataModel';
import {Router} from '@angular/router';
import {FilterService } from '../filter.service';
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
        token: DataModel.account.token
      })
    };
    this.http.get<ExperimentModel[]>(
      getExperimentUrl(), httpOptions)
      .subscribe(
        responseData => {
          this.filterService.isDataSet.next(responseData);
        }
      );
  }

  ngOnInit() {
    if (DataModel.account.token == null) {
      this.popupService.dangerPopup('U bent nog niet ingelogd.');
      this.router.navigate(['/']);
    } else {
      const self = this;
      this.permissionService.initialize(() => {
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
        ).subscribe(responseData => {
          if (responseData.toString().toLowerCase() == 'succes') {
            this.showExperiments();
            this.popupService.succesPopup(
              experiment.experiment_name + ' is succesvol verwijderd!'
            );
          } else { this.popupService.dangerPopup(responseData.toString()); }
        });
      }
    );
  }

  openExistingExperiment(model: ExperimentModel){
    const modal = this.modalService.open(ExistingExperimentComponent, { windowClass : 'myCustomModalClass'});
    modal.componentInstance.model = model;
  }

  openCreateExperiment() {
    this.modalService.open(CreateExperimentComponent, { windowClass : 'myCustomModalClass'});
  }
}
