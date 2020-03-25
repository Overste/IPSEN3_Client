import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PopupService} from '../../popup.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {UserPermissionService} from '../../services/user-permission-service';
import {FilterService} from '../../filter.service';
import DataModel from '../../models/DataModel';
import {ExperimentModel} from '../../models/ExperimentModel';
import {getExperimentUrl} from '../ExperimentUrl';
import {deleteExperiment} from '../ExperimentUrl';
import {ExistingExperimentComponent} from '../existing-experiment/existing-experiment.component';
import {CreateExperimentComponent} from '../create-experiment/create-experiment.component';
import {ExperimentService} from '../../experiment.service';

@Component({
  selector: 'app-graveyard',
  templateUrl: './graveyard.component.html',
  styleUrls: ['./graveyard.component.css']
})
export class GraveyardComponent implements OnInit {
  canEdit = false;

  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private modalService: NgbModal,
    public filterService: FilterService,
    public experimentService: ExperimentService) {
  }

  ngOnInit(): void {
    this.experimentService.showExperiments('kerkhoff');
  }

  deleteExperiment(experiment: ExperimentModel) {
    this.experimentService.deleteExperiment(experiment);
  }

  openExistingExperiment(model: ExperimentModel) {
    const modal = this.modalService.open(ExistingExperimentComponent, { windowClass : 'myCustomModalClass'});
    modal.componentInstance.model = model;
  }

  openCreateExperiment() {
    this.modalService.open(CreateExperimentComponent, { windowClass : 'myCustomModalClass'});
  }
}
