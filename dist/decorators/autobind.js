export function AutoBind(_, __, propertyDescriptor) {
    console.log(propertyDescriptor);
    let originalCallback = propertyDescriptor.value;
    const newPropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalCallback.bind(this);
        },
    };
    return newPropertyDescriptor;
}
//# sourceMappingURL=autobind.js.map