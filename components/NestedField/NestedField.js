Component.NestedField = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'NestedField';

    this.parts = {
      head: Component('Button', { text: essence.label, value: (essence.isExpanded || true) }).setAlias('NestedHead'),
      body: Component('Block').setAlias('NestedBody')
    };

    this.props = {
      isExpanded : false,
      fields     : [],
      key        : '',
      label      : '',
      value      : null
    };

    this.propTypes = {
      isExpanded : 'boolean',
      fields     : 'array',
      key        : 'string',
      label      : 'string',
    };

    this.toggles = {
      expanded : false
    }

    this.invoke(essence);
  }

  applyChanges(value) {
    const fieldValue = this.getState('value');

    for (let key in value) {
      let fieldPath = key.split(' ');
      let index = fieldPath[0];
      let fieldName = fieldPath[1];

      fieldValue[index][fieldName] = value[key];
    }
    this.setState('value', fieldValue);
  }

  processSignal(signal, value, origin) {
    switch (signal) {
      case 'NESTEDHEAD_CLICKED':
        this.setState('isExpanded', value)
        return 'STOP';
      case 'VALUE_CHANGED':
        this.applyChanges(value);
        return 'STOP';
      default:
    }
    return this;
  }

  render() {
    const parts = this.parts;
    this.add(parts.head).add(parts.body);
  }

  renderIsExpanded(isExpanded) {
    if (!isExpanded) {
      this.signalChildren('NESTEDHEAD_CLICKED', false);
    }

    this.setToggle('expanded', isExpanded);
    this.parts.head.setState('value', !isExpanded);
  }

  renderState(stateName, newValue, oldValue) {
    switch (stateName) {
      case 'isExpanded':
        this.renderIsExpanded(newValue);
        break;
      case 'value':
        this.renderValue(newValue);
        break;
      default:
    }
  }

  renderValue(newValue) {
    let key = this.getState('key');
    this.signalParent('VALUE_CHANGED', { [key]: newValue });

    return this;
  }
};