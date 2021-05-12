class Context {
  model: Map<string, object>;

  constructor(model?: Record<string, any>) {
    this.model = new Map<string, object>();
    if (model) {
      Object.keys(model).forEach(prop => {
        this.model.set(prop, model[prop]);
      });
    }
  }

  getValue(name: string): object {
    return name ? this.model.get(name) || {} : {};
  }
}

export { Context };
