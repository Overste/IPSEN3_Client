import {getConfigureDowloadUrl, getConfigureUploadUrl} from './experiment-list/ExperimentUrl';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import DataModel from './models/DataModel';
import {LogModel} from './models/LogModel';
import {Injectable} from '@angular/core';
import {PopupService} from './popup.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Injectable()
export class LogService {
  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private modalService: NgbModal,
    private router: Router
  ) {
    if (DataModel.account.token == null) {
      this.popupService.dangerPopup('U bent nog niet ingelogd.');
      this.router.navigate(['/']);
    }
  }

  fetchLogRows(experiment_id: number) {
    const url = getConfigureDowloadUrl(experiment_id);

    const httpOptions = {
      headers: new HttpHeaders({
        token: DataModel.account.token
      })
    };

    return this.http.get<LogModel[]>(url, httpOptions);
  }

  uploadLog(logModel: LogModel) {
    return this.http.post(getConfigureUploadUrl(), logModel,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: DataModel.account.token
        })
      }
    );
  }
}
