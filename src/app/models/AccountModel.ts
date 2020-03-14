import { getHasWriteFromCookie, getHasDeleteFromCookie, getHasReadFromCookie, getHasAdminFromCookie } from '../services/cookie';

/**
*
* @author Anthony Scheeres
*
*/
export class AccountModel {


  token: string = localStorage.getItem("token");
  hasWrite = false;
  hasDelete = false;
  hasRead = false;
  hasSuperPermission: boolean = false;
  constructor() { }

}
