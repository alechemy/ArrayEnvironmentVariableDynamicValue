@registerDynamicValueClass
class ArrayEnvironmentVariableDynamicValue {
  static identifier = "com.alechemy.ArrayEnvironmentVariableDynamicValue";
  static title = "Value in Environment Variable";
  static help = "https://github.com/alechemy";
  static inputs = [
    InputField("envVar", "Environment Variable", "EnvironmentVariable", {
      persisted: true,
    }),
    InputField("index", "Index", "Number", {
      placeholder: "Index of the desired value",
      defaultValue: 0,
      minValue: 0,
      persisted: true,
    }),
  ];

  constructor() {
    this.context = null;
  }

  evaluate(context) {
    this.context = context;

    const envVar = this.envVar;
    const index = this.index;

    return this._getVariableAtIndex(context, envVar, index);
  }

  title() {
    if (this.envVar) {
      let value = this.envVar.getCurrentValue();
      let length = 0;

      try {
        length = JSON.parse(value).length;
      } catch (e) {
        length = "Error";
      }
      return `${this.envVar.name} (${length})`;
    }
  }

  text(context) {
    this.context = context;

    const envVar = this.envVar;
    const index = this.index;

    return this._getVariableAtIndex(context, envVar, index);
  }

  _getVariableAtIndex(_context, envVar, index) {
    if (!envVar) {
      return "Select an Environment Variable";
    }

    let final;
    let value = envVar.getCurrentValue();

    try {
      final = JSON.parse(value);
    } catch (e) {
      final = [];
    }

    if (Number.isInteger(index) && index >= 0 && final?.length > 0) {
      return final[index];
    } else {
      return "Error";
    }
  }
}
