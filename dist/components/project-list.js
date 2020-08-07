var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./component-base.js";
import { ProjectStatus } from "../models/project-model.js";
import { AutoBind } from "../decorators/autobind.js";
import { ProjectItem } from "./project-item.js";
import { projectState } from "../state/project-state.js";
export class ProjectList extends Component {
    constructor(status) {
        super('project-list', 'app', false, `${ProjectStatus[status]}-projects`);
        this.status = status;
        this.projects = [];
        this.listElement = this.element.querySelector('ul');
        this.listElement.id = `${ProjectStatus[this.status]}-projects-list`;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            this.listElement.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(prjId, this.status);
        console.log(prjId);
    }
    dragLeaveHandler(_) {
        this.listElement.classList.remove('droppable');
    }
    configure() {
        projectState.addListener((projects) => {
            this.assignedProjects = projects.filter((project) => project.status == this.status);
            this.renderProjects();
        });
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = `${ProjectStatus[this.status]
            .toString()
            .toUpperCase()} PROJECTS`;
    }
    renderProjects() {
        this.clearUlElement();
        this.assignedProjects.forEach((project) => {
            new ProjectItem(this.listElement.id, project);
        });
    }
    clearUlElement() {
        let child = this.listElement.lastElementChild;
        while (child) {
            this.listElement.removeChild(child);
            child = this.listElement.lastElementChild;
        }
    }
}
__decorate([
    AutoBind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dragLeaveHandler", null);
//# sourceMappingURL=project-list.js.map