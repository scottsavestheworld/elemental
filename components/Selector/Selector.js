Component.Selector = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Selector';

    this.parts = {    
      label     : document.createElement('label'),
      options   : document.createElement('div'),  
      selection : document.createElement('div')
    };

    this.props = {
      data  : [],
      label : '',
      text  : '',
      value : null,
    };

    this.propTypes = {
      data  : 'array',
      label : 'string',
      text  : 'string'
    };

    this.invoke(essence);
  }

  processSignal(signal, value, origin) {
    switch (signal) {
      case 'PREVIEW_CHANGED':
        this.setState('showPreview', value);
        break;
      case 'PARSE_HTML':
        this.setState('parseHTML', value);
        break;
      default:
    }
  }

  render() {
    const parts = this.parts;
    const states = this.states;
    let parseHTML = states.parseHTML;
    let renderedText = states.parseMarkdown ? states.markdownParser(states.value) : states.value;
    let inputValue = states.value || '';

    parts.rendered['inner' + (parseHTML ? 'HTML' : 'Text')] = renderedText;
    parts.input.value = inputValue;
    this.setState('length', inputValue.length);

    return this;
  }

  renderAutoResize(isToBeAutoResized) {
    this.setAttribute('rows', isToBeAutoResized ? '1' : '', this.parts.input);
  }

  renderPreview(showPreview) {
    let parts = this.parts;
    this.removeAllChildren();

    if (!showPreview) {
      this.add(parts.label).add(parts.input);
    } else {
      this.add(parts.rendered);
    }
    return showPreview;
  }

  renderLabel(label) {
    this.parts.label.innerText = label;
    return label;
  }
};