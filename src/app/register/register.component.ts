import { Component, OnInit } from '@angular/core';
import { sendHttpRequest } from '../services/http.component';
import { ServerModel } from '../models/ServerModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})




/**
*
* @author Anthony Scheeres
*
*/
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  registerUser(event) {
    event.preventDefault()
    const target = event.target

    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    const email = target.querySelector('#email').value

    var xhr = new XMLHttpRequest();
    var host = ServerModel.host
    var port = ServerModel.port
    var url = "http://" + host + ":" + port + "/user/create";
    
    var data = JSON.stringify({
      "username": username,
      "password": password,
      "id": null,
      "permission": null,
      "email": email
    });


    sendHttpRequest(url, data.toString()).then(response => {
      console.log("response : " + response);
      if (response != ResponseRequest.fail) {
       

      }

    });
  }
}


   









