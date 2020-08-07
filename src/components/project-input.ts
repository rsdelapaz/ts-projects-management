import { Component } from "./component-base.js";
import { Project, ProjectStatus } from "../models/project-model.js";
import { validate } from "../validation/validators.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
  
    constructor() {
      super('project-input', 'app', true, 'user-input');
  
      this.titleInputElement = this.element.querySelector(
        '#title',
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        '#description',
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        '#people',
      ) as HTMLInputElement;
  
      this.configure();
      this.renderContent();
    }
  
    configure() {
      this.element.addEventListener('submit', this.submitCallback);
    }
  
    renderContent() {}
  
    private collectUserInput(): [string, string, number] | undefined {
      const title = this.titleInputElement.value;
      const description = this.descriptionInputElement.value;
      const people = this.peopleInputElement.value;
      const project = new Project(
        title,
        description,
        +people,
        ProjectStatus.Active,
      );
  
      if (!validate(project)) {
        alert('Project not valid. Please try again');
        return;
      } else {
        return [title, description, +people];
      }
    }
  
    @AutoBind
    private submitCallback(event: Event) {
      event.preventDefault();
  
      const inputs = this.collectUserInput();
  
      if (Array.isArray(inputs)) {
        const [title, description, people] = inputs;
  
        console.log(title, description, people);
  
        projectState.addProject(title, description, people);
  
        (this.element as HTMLFormElement).reset();
      }
    }
  }
