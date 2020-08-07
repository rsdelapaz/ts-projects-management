import { Component } from "./component-base.js";
import { DragTarget } from "../models/drag-drop.js";
import { Project, ProjectStatus } from "../models/project-model.js";
import { AutoBind } from "../decorators/autobind.js";
import { ProjectItem } from "./project-item.js";
import { projectState } from "../state/project-state.js";

export class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  projects: Project[] = [];
  assignedProjects: Project[];
  listElement: HTMLUListElement;

  constructor(private status: ProjectStatus) {
    super('project-list', 'app', false, `${ProjectStatus[status]}-projects`);

    this.listElement = this.element.querySelector('ul') as HTMLUListElement;
    this.listElement.id = `${ProjectStatus[this.status]}-projects-list`;
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      this.listElement.classList.add('droppable');
    }
  }

  @AutoBind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(prjId, this.status);
    console.log(prjId);
  }

  @AutoBind
  dragLeaveHandler(_: DragEvent): void {
    this.listElement.classList.remove('droppable');    
  }

  configure() {
    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects.filter(
        (project) => project.status == this.status,
      );
      this.renderProjects();
    });

    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = `${ProjectStatus[
      this.status
    ]
      .toString()
      .toUpperCase()} PROJECTS`;
  }

  private renderProjects() {
    this.clearUlElement();

    this.assignedProjects.forEach((project) => {
      new ProjectItem(this.listElement.id, project);
    });
  }

  private clearUlElement() {
    let child = this.listElement.lastElementChild;

    while (child) {
      this.listElement.removeChild(child);
      child = this.listElement.lastElementChild;
    }
  }
}
