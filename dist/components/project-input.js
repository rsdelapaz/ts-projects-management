var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./component-base.js";
import { Project, ProjectStatus } from "../models/project-model.js";
import { validate } from "../validation/validators.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
export class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        this.renderContent();
    }
    configure() {
        this.element.addEventListener('submit', this.submitCallback);
    }
    renderContent() { }
    collectUserInput() {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const people = this.peopleInputElement.value;
        const project = new Project(title, description, +people, ProjectStatus.Active);
        if (!validate(project)) {
            alert('Project not valid. Please try again');
            return;
        }
        else {
            return [title, description, +people];
        }
    }
    submitCallback(event) {
        event.preventDefault();
        const inputs = this.collectUserInput();
        if (Array.isArray(inputs)) {
            const [title, description, people] = inputs;
            console.log(title, description, people);
            projectState.addProject(title, description, people);
            this.element.reset();
        }
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitCallback", null);
//# sourceMappingURL=project-input.js.map