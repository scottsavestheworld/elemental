Component.Button = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Button';

    this.parts = {
      image: document.createElement('img'),
      text: document.createTextNode(''),
    };

    this.props = {
      image: '',
      layout: ['image', 'text'],
      text: '',
      target: null,
      value: ''
    };

    this.invoke(essence);
  }

  createEvents() {
    this.on('click', () => {
      this.signalParent(
        this.alias.toUpperCase() + '_CLICKED',
        this.getState('value'),
        true
      );
    });
  }

  onStateChange(stateName, newValue, oldValue) {
    this.render();
  }

  render() {
    if (this.wasInvoked) {
      const partNames = this.states.layout;
      const parts = this.parts;
      this.removeAllChildren();

      for (let partName of partNames) {
        if (this.parts[partName]) {
          if (this.states[partName]) {
            this.add(parts[partName]);
          } else {
            this.remove(parts[partName]);
          }
        }
      }
    }
  }

  renderImage(newValue, oldValue) {
    this.parts.image.src = newValue;
    if (!newValue || !oldValue) {
      this.render();
    }
  }

  renderTarget(newValue, oldValue) {
    this.on('click', () => {
      this.signal(
        newValue,
        this.alias.toUpperCase() + '_CLICKED',
        this.getProp('value')
      );
    });
  }

  renderText(newValue, oldValue) {
    this.parts.text.nodeValue = newValue;
    if (!newValue || !oldValue) {
      this.render();
    }
  }
};