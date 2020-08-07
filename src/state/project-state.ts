import { Project, ProjectStatus } from "../models/project-model.js";
import { Listener } from "../types/type.js";

class ProjectState {
    private projects: Project[] = [];
    private static instance: ProjectState;
    private listeners: Listener[] = [];
  
    private constructor() {}
  
    static getInstance() {
      return this.instance || (this.instance = new ProjectState());
    }
  
    addProject(title: string, description: string, people: number) {
      const newProject = new Project(
        title,
        description,
        people,
        ProjectStatus.Active,
      );
  
      this.projects = [...this.projects, newProject];
  
      this.emitToListeners(this.listeners, this.projects);
    }
  
    addListener(listenerCallback: Listener) {
      this.listeners = [...this.listeners, listenerCallback];
    }
  
    emitToListeners(listeners: Listener[], projects: Project[]) {
      const promises: Promise<any>[] = [];
  
      listeners.forEach((listener) => {
        promises.push(new Promise((_) => listener([...projects])));
      });
  
      Promise.all(promises).then((_) => alert('ALL IS OK!'));
    }
  
    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((p) => p.id === projectId);
  
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }
  
    private updateListeners() {
      for (const listener of this.listeners) {
        listener([...this.projects]);
      }
    }
  }
  
  export const projectState = ProjectState.getInstance();