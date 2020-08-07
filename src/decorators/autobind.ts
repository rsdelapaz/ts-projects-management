export function AutoBind(
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
      },
    };
  
    return newPropertyDescriptor;
  }