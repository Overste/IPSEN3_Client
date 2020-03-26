import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExperimentModel} from '../models/ExperimentModel';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateExperimentComponent} from './create-experiment/create-experiment.component';
import {ExistingExperimentComponent} from './existing-experiment/existing-experiment.component';
import {PopupService} from '../popup.service';
import {FilterService } from '../filter.service';
import {ExperimentService} from '../experiment.service';

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css'],
})

export class ExperimentListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private modalService: NgbModal,
    public filterService: FilterService,
    public experimentService: ExperimentService) {
  }

  ngOnInit(): void {
    this.experimentService.showExperiments();
  }

  moveExperimentToGraveyard(experiment: ExperimentModel) {
    // experiment.experiment_phase = 'graveyard';
    experiment.experiment_phase = 'Niet succesvol afgerond';
    this.experimentService.updateExperiment(experiment);
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
