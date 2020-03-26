import { ServerModel } from '../models/ServerModel';

export function getExperimentUrl() {

  return 'http://' + ServerModel.host + ':' + ServerModel.port + '/experiment/showAllExperiments';
}

export function getCreateExperimentUrl() {
  return  'http://' + ServerModel.host + ':' + ServerModel.port + '/experiment/createProject';
}

export function getUpdateExperimentUrl() {
  return 'http://' + ServerModel.host + ':' + ServerModel.port + '/experiment/updateProject';
}

export function getPhaseExperimentUrl() {
  return 'http://' + ServerModel.host + ':' + ServerModel.port + '/experiment/showPhaseOfExperiments';
}

export function deleteExperiment(experiment_id: number) {
  return 'http://' + ServerModel.host + ':' + ServerModel.port + '/experiment/remove/' + experiment_id;
}

export function getConfigureDowloadUrl(experiment_id: number) {
  return 'http://' + ServerModel.host + ':' + ServerModel.port + '/log/download/' + experiment_id;
}

export function getConfigureUploadUrl() {
  return 'http://' + ServerModel.host + ':' + ServerModel.port + '/log/upload';
}
