function AutoBind(
  _: any,
  __: string | Symbol,
  propertyDescriptor: PropertyDescriptor,
) {
  console.log(propertyDescriptor);

  let originalCallback = propertyDescriptor.value;
  const newPropertyDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,    
    get() {     
      return originalCallback.bind(this);
    }
  };  

  return newPropertyDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input',
    ) as HTMLTemplateElement;

    this.hostElement = document.getElementById('app') as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );

    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = 'user-input';
    this.titleInputElement = this.formElement.querySelector(
      '#title',
    ) as HTMLInputElement;
    this.descriptionInputElement = this.formElement.querySelector(
      '#description',
    ) as HTMLInputElement;
    this.peopleInputElement = this.formElement.querySelector(
      '#people',
    ) as HTMLInputElement;

    this.hostElement.insertAdjacentElement('afterbegin', this.formElement);

    this.bindEvents();
  }

  private bindEvents() {
    this.formElement.addEventListener('submit', this.submitCallback);
  }

  @AutoBind
  private submitCallback(event: Event) {
    event.preventDefault();
    
    console.debug(this.titleInputElement.value);
  }
}

const projectInput = new ProjectInput();
