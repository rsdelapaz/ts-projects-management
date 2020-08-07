import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";
import { ProjectStatus } from "./models/project-model.js";
new ProjectInput();
new ProjectList(ProjectStatus.Active);
new ProjectList(ProjectStatus.Finished);
//# sourceMappingURL=app.js.map