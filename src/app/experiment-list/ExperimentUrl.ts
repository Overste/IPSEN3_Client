import { ServerModel } from '../models/ServerModel';
import DataModel from '../models/DataModel';


export function getExperimentUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token;
  var url = "http://" + host + ":" + port + "/experiment/showAllExperiments";
  return url
}

export function getCreateExperimentUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token;
  var url = "http://" + host + ":" + port + "/experiment/createProject";
  return url
}

export function getUpdateExperimentUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token;
  var url = "http://" + host + ":" + port + "/experiment/updateProject";
  return url
}

export function getPhaseExperimentUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = DataModel.account.token;
  var url = "http://" + host + ":" + port + "/experiment/showPhaseOfExperiments";
  return url
}

export function deleteExperiment(experiment_id : number) {
  var host = ServerModel.host;
  var port = ServerModel.port;

  return "http://" + host + ":" + port + "/experiment/remove/" + experiment_id;
}
