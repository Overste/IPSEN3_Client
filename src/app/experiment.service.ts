import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PopupService} from './popup.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {UserPermissionService} from './services/user-permission-service';
import {FilterService} from './filter.service';
import DataModel from './models/DataModel';
import {ExperimentModel} from './models/ExperimentModel';
import {getExperimentUrl} from './experiment-list/ExperimentUrl';
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

  showExperiments() {
    const httpOptions =  {
      headers: new HttpHeaders({
        token: DataModel.account.token
      })
    };
    this.http.get<ExperimentModel[]>(
      getExperimentUrl(), httpOptions
    ).subscribe(
      responseData => {
        this.filterService.isDataSet.next(responseData);
      }
    );
  }


  // deleteExperiment(experiment : ExperimentModel) {
  //   this.popupService.showConfirmPopup(experiment.experiment_name).then(
  //     () => {
  //       const headers =  new HttpHeaders().set('token', DataModel.account.token);
  //
  //       this.http.delete(
  //         deleteExperiment(experiment.experiment_id),
  //         {responseType: 'text', headers}
  //       ).subscribe(responseData => {
  //         if (responseData.toString().toLowerCase() == 'succes') {
  //           this.showExperiments();
  //           this.popupService.succesPopup(
  //             experiment.experiment_name + ' is succesvol verwijderd!'
  //           );
  //         } else { this.popupService.dangerPopup(responseData.toString()); }
  //       });
  //     }
  //   );
  // }
}
