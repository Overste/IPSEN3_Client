import { ServerModel } from '../models/ServerModel';
import { AccountModel } from '../models/AccountModel';
import DataModel from '../models/DataModel';

export function getExperiments() {
  var host = ServerModel.host;
  var port = ServerModel.port;

  // var url = "http://" + host + ":" + port + "/experiment/showAllExperiments";
  return "http://" + host + ":" + port + "/experiment/showAllExperiments";
}

export function deleteExperiment(experiment_id : number) {
  var host = ServerModel.host;
  var port = ServerModel.port;

  return "http://" + host + ":" + port + "/experiment/remove/" + experiment_id;
}
