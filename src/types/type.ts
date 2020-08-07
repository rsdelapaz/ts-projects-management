import { Project } from "../models/project-model.js";

export type Listener = (projects: Project[]) => void;
