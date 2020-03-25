import {getConfigureDowloadUrl, getConfigureUploadUrl} from './experiment-list/ExperimentUrl';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import DataModel from './models/DataModel';
import {LogModel} from './models/LogModel';
import {Injectable} from '@angular/core';

@Injectable()
export class LogService {
  constructor(private http: HttpClient) { }

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
