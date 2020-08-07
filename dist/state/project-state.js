import { Project, ProjectStatus } from "../models/project-model.js";
class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    static getInstance() {
        return this.instance || (this.instance = new ProjectState());
    }
    addProject(title, description, people) {
        const newProject = new Project(title, description, people, ProjectStatus.Active);
        this.projects = [...this.projects, newProject];
        this.emitToListeners(this.listeners, this.projects);
    }
    addListener(listenerCallback) {
        this.listeners = [...this.listeners, listenerCallback];
    }
    emitToListeners(listeners, projects) {
        const promises = [];
        listeners.forEach((listener) => {
            promises.push(new Promise((_) => listener([...projects])));
        });
        Promise.all(promises).then((_) => alert('ALL IS OK!'));
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((p) => p.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listener of this.listeners) {
            listener([...this.projects]);
        }
    }
}
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map