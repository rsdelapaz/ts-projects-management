var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./component-base.js";
import { AutoBind } from "../decorators/autobind.js";
export class ProjectItem extends Component {
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id.toString());
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        return this.project.peopleCount === 1
            ? '1 person'
            : `${this.project.peopleCount} persons`;
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id.toString());
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(event) {
        console.log(event);
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons;
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    AutoBind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    AutoBind
], ProjectItem.prototype, "dragEndHandler", null);
//# sourceMappingURL=project-item.js.map