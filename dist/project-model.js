"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjtectModel;
(function (ProjtectModel) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = ProjtectModel.ProjectStatus || (ProjtectModel.ProjectStatus = {}));
    class Project {
        constructor(t, d, p, s) {
            this.id = Date.now().toString();
            this.title = t;
            this.description = d;
            this.peopleCount = p;
            this.status = s;
        }
    }
    __decorate([
        Required
    ], Project.prototype, "title", void 0);
    __decorate([
        PositiveNumber
    ], Project.prototype, "peopleCount", void 0);
    ProjtectModel.Project = Project;
})(ProjtectModel || (ProjtectModel = {}));
//# sourceMappingURL=project-model.js.map