import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerModel} from '../models/ServerModel';
import DataModel from '../models/DataModel';
import {UserModel} from '../models/UserModel';
import {PopupService} from '../popup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userdata: UserModel;
  dataIsSet = false;

  constructor(private http: HttpClient, private popupService: PopupService) { }

  ngOnInit() {
    this.getUserdata();
  }

  getUserdata() {
    var host = ServerModel.host;
    var port = ServerModel.port;
    var url = "http://" + host + ":" + port + "/user/getUserInfo";
    const headers =  new HttpHeaders().set('token', DataModel.account.token);
    this.http.get<UserModel>(url, {headers}).subscribe(response => {
      this.userdata = response;
      this.dataIsSet = true;
    }, () => {
      this.popupService.dangerPopup("Er ging iets mis, probeer het later nog een keer.")
    });
  }

}
