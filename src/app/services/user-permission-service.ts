import {Injectable} from "@angular/core";
import DataModel from "../models/DataModel";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerModel} from "../models/ServerModel";
import {UserRole} from "../models/UserRole";
import {PopupService} from '../popup.service';

/**
 * @author Valerie Timmerman
 * This class is used to check if a user has permissions for certain actions.
 */

@Injectable({providedIn: "root"})
export class UserPermissionService {

  role: UserRole;

  constructor(private http: HttpClient, private popupService: PopupService) {
  }

  isLoggedIn() {
    return DataModel.account.token != null;
  }

  hasSuperPermissions() {
    if(this.role == UserRole.SUPERUSER) {
      return true;
    } else {
      return false;
    }
  }

  hasEmployeePermissions() {
    if(this.role == UserRole.EMPLOYEE || this.role == UserRole.SUPERUSER) {
      return true;
    } else {
      return false;
    }
  }

  hasUserPermissions() {
    if(this.role == UserRole.USER || this.role == UserRole.EMPLOYEE || this.role == UserRole.SUPERUSER) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @author Valerie Timmerman
   * Initializes the class by getting the role of the person that is using the application.
   */
  initialize(callBack?: Function) {
    var host = ServerModel.host;
    var port = ServerModel.port;
    var url = "http://" + host + ":" + port + "/user/getRole";
    const headers =  new HttpHeaders().set('token', DataModel.account.token);

    this.http.get(url, {responseType: 'text', headers}).subscribe(r => {
      this.role = UserRole[r];
      if(callBack)
        callBack();
      }, error => {
      this.handleError(error);
      }
    );
  }

  handleError(error: any) {
    switch (error.status) {
      case 400:
        this.popupService.dangerPopup("Er trad een server probleem op, we konden uw permissies niet valideren.");
        break;
      case 404:
        this.popupService.dangerPopup("We konden uw account permissies niet vinden in onze database, neem contact op" +
          "met de systeembeheerder.");
    }
  }

}
