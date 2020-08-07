import { Required, PositiveNumber } from "../validation/validators.js";

export enum ProjectStatus {
  Active,
  Finished,
}

export class Project {
  id: string;
  @Required
  title: string;
  description: string;
  @PositiveNumber
  peopleCount: number;
  status: ProjectStatus;

  constructor(t: string, d: string, p: number, s: ProjectStatus) {
    this.id = Date.now().toString();
    this.title = t;
    this.description = d;
    this.peopleCount = p;
    this.status = s;
  }
}
