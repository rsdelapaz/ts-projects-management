"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function AutoBind(_, __, propertyDescriptor) {
    console.log(propertyDescriptor);
    let originalCallback = propertyDescriptor.value;
    const newPropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalCallback.bind(this);
        }
    };
    return newPropertyDescriptor;
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.firstElementChild;
        this.formElement.id = 'user-input';
        this.titleInputElement = this.formElement.querySelector('#title');
        this.descriptionInputElement = this.formElement.querySelector('#description');
        this.peopleInputElement = this.formElement.querySelector('#people');
        this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
        this.bindEvents();
    }
    bindEvents() {
        this.formElement.addEventListener('submit', this.submitCallback);
    }
    submitCallback(event) {
        event.preventDefault();
        console.debug(this.titleInputElement.value);
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitCallback", null);
const projectInput = new ProjectInput();
//# sourceMappingURL=app.js.map