import { Component } from "./component-base.js";
import { Draggable } from "../models/drag-drop.js";
import { Project } from "../models/project-model.js";
import { AutoBind } from "../decorators/autobind.js";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get persons() {
    return this.project.peopleCount === 1
      ? '1 person'
      : `${this.project.peopleCount} persons`;
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id.toString());

    this.project = project;

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id.toString());
    event.dataTransfer!.effectAllowed = 'move';
  }

  @AutoBind
  dragEndHandler(event: DragEvent): void {
    console.log(event);
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
