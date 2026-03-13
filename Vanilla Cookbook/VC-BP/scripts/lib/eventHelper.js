export function methodEventSub(event) {
    return (target, propertyKey) => {
      event.subscribe((args) => {
        const instance = new target.constructor();
        instance[propertyKey](args);
      });
    };
  }