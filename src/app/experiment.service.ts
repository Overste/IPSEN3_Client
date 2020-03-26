import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PopupService} from './popup.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {UserPermissionService} from './services/user-permission-service';
import {FilterService} from './filter.service';
import DataModel from './models/DataModel';
import {ExperimentModel} from './models/ExperimentModel';
import {
  getExperimentUrl,
  getUpdateExperimentUrl,
  deleteExperiment
} from './experiment-list/ExperimentUrl';

import {Injectable} from '@angular/core';

@Injectable()
export class ExperimentService {
  canEdit = false;

  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private modalService: NgbModal,
    private router: Router,
    private permissionService: UserPermissionService,
    public filterService: FilterService
  ) {
    if (DataModel.account.token == null) {
      this.popupService.dangerPopup('U bent nog niet ingelogd.');
      this.router.navigate(['/']);
    } else {
      const self = this;
      this.permissionService.initialize(() => {
        self.canEdit = self.permissionService.hasSuperPermissions();
      });
    }
  }

  showExperiments(phase?: string) {
    const httpOptions =  {
      headers: new HttpHeaders({
        token: DataModel.account.token
      })
    };
    this.http.get<ExperimentModel[]>(
      getExperimentUrl(), httpOptions
    ).subscribe(
      responseData => {
        this.filterService.isDataSet.next(this.filterExperiment(responseData, phase));
      }
    );
  }

  filterExperiment(experiments: ExperimentModel[], phase?: string) {
    let filteredExperimentsByPhase = [];

    if (typeof phase !== 'undefined') {
      for (const experiment of experiments) {
        if (experiment.experiment_phase.toLowerCase() === phase.toLowerCase()) {
          filteredExperimentsByPhase.push(experiment);
        }
      }
    } else  {
      filteredExperimentsByPhase = experiments;
    }

    return filteredExperimentsByPhase;
  }

  deleteExperiment(experiment: ExperimentModel) {
    this.popupService.showConfirmPopup(experiment.experiment_name).then(
      () => {
        const headers =  new HttpHeaders().set('token', DataModel.account.token);

        this.http.delete(
          deleteExperiment(experiment.experiment_id),
          {responseType: 'text', headers}
        ).subscribe(responseData => {
          if (responseData.toString().toLowerCase() === 'succes') {
            this.showExperiments();
            this.popupService.succesPopup(
              experiment.experiment_name + ' is succesvol verwijderd!'
            );
          } else { this.popupService.dangerPopup(responseData.toString()); }
        }, error => {
            this.handleError(error);
          });
      }
    );
  }

  updateExperiment(data) {
    return this.http.post(getUpdateExperimentUrl(), data,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: DataModel.account.token
        })
      }
    );
  }

  handleError(error: any) {
    switch (error.status) {
      case 401:
        this.popupService.dangerPopup('U heeft niet de juiste rechten.');
        break;
      case 400:
        this.popupService.dangerPopup('We konden u identiteit niet valideren, neem contact op met de systeembeheerder.');
        break;
      case 500:
        this.popupService.dangerPopup('Er ging iets mis, probeer het later nog eens.');
    }
  }
}
