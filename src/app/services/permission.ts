import { ServerModel } from '../models/ServerModel';
import DataModel from '../models/DataModel';
import { fetchPost } from './http.';
import { AccountModel } from '../models/AccountModel';
/**
*
* @author Anthony Scheeres
*
*/
export function hasDelete() {
  let host = ServerModel.host;
  let port = ServerModel.port;
  let url = 'http://' + host + ':' + port + '/user/hasDelete';

  return fetchPost(url);
}

/**
*
* @author Anthony Scheeres
*
*/
export function hasAdmin() {
  let host = ServerModel.host;
  let port = ServerModel.port;
  let url = 'http://' + host + ':' + port + '/user/hasAdmin';
  return fetchPost(url);
}


/**
*
* @author Anthony Scheeres
*
*/
export function hasWrite() {
  let host = ServerModel.host;
  let port = ServerModel.port;
  let url = 'http://' + host + ':' + port + '/user/hasWrite';






  return fetchPost(url);
}


/**
*
* @author Anthony Scheeres
*
*/
export function hasRead() {
  let host = ServerModel.host;
  let port = ServerModel.port;
  let url = 'http://' + host + ':' + port + '/user/hasRead';




  return fetchPost(url);
}


function hasPermissionFromResponse(response: String) {
  return response.toLocaleLowerCase() === 'true';
}


/**
*
* @author Anthony Scheeres
*
*/
export async function setHasRead() {
  let variable = 'hasRead';
  await hasRead().then(response => {

    if (hasPermissionFromResponse(response)) {

      localStorage.setItem(variable, response);
      return DataModel.account.hasRead = true;
    }

    localStorage.setItem(variable, 'false');
    DataModel.account.hasRead = false;
  });
}


/**
*
* @author Anthony Scheeres
*
*/
export async function setHasWrite() {
  let variable = 'hasWrite';
  await hasWrite().then(response => {

    if (hasPermissionFromResponse(response)) {

      localStorage.setItem(variable, response);
      return DataModel.account.hasWrite = true;
    }

    localStorage.setItem(variable, 'false');
    DataModel.account.hasWrite = false;
  });
}

/**
*
* @author Anthony Scheeres
*
*/
export async function setHasDelete() {
  let variable = 'hasDelete';
  await hasDelete().then(response => {

    if (hasPermissionFromResponse(response)) {


      localStorage.setItem(variable, response);
      return DataModel.account.hasDelete = true;
    }

    localStorage.setItem(variable, 'false');
    DataModel.account.hasDelete = false;
  });



}


/**
*
* @author Anthony Scheeres
*
*/
export function logOut() {
  localStorage.clear();
  DataModel.account = new AccountModel();
}

export async function nullHasSuperPermission() {
  DataModel.account.hasSuperPermission = null;

  localStorage.setItem('hasSuperPermission', null);
}
/**
*
* @author Anthony Scheeres
*
*/
export async function nullToken() {
  DataModel.account.token = null;

  localStorage.clear();
}


/**
*
* @author Anthony Scheeres
*
*/
export async function nullHasWrite() {
  DataModel.account.hasWrite = null;

  localStorage.setItem('hasWrite', null);
}
/**
*
* @author Anthony Scheeres
*
*/
export async function nullHasDelete() {
  DataModel.account.hasDelete = false;

  localStorage.setItem('hasDelete', null);
}
/**
*
* @author Anthony Scheeres
*
*/
export async function nullHasRead() {
  DataModel.account.hasRead = false;

  localStorage.setItem('hasRead', null);
}



/**
*
* @author Anthony Scheeres
*
*/
export async function setHasWhatPermission() {
  setHasWrite();
  setHasDelete();
  setHasRead();
}

function checkInput(val) {
  return val == null || val === false;
}


/**
*
* @author Anthony Scheeres
*
*/
export function hasSuperPermission() {

  let result = false;
  let delet = DataModel.account.hasDelete;
  let read = DataModel.account.hasRead;
  let write = DataModel.account.hasWrite;

  result = delet && read && write;
  let val;
  // "hasRead: " + DataModel.account.hasRead);
  if (checkInput(val)) {
    localStorage.setItem('hasSuperPermission', 'false');
    DataModel.account.hasSuperPermission = false;
  }

  if (!result) {

  }
  localStorage.setItem('hasSuperPermission', 'true');
  DataModel.account.hasSuperPermission = result;
  return result;
}

