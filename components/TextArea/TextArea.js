Component.TextArea = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'TextArea';

    this.parts = {
      toggles        : document.createElement('div'),
      toggleHTML     : document.createElement('button'),
      toggleMarkdown : document.createElement('button'),
      togglePreview  : document.createElement('button'),    
      input          : document.createElement('textarea'),
      label          : document.createElement('label'),
      rendered       : document.createElement('div'),
    };

    this.props = {
      autoResize     : true,
      key            : '',
      label          : '',
      labels         : {},
      length         : 0,
      markdownParser : (text) => { return text + ' (PARSED)' },
      parseHTML      : true,
      parseMarkdown  : false,
      placeholder    : '',
      showPreview    : false,
      value          : ''
    };

    this.propTypes = {
      autoResize     : 'boolean',
      key            : 'string',
      label          : 'string',
      labels         : 'object',
      length         : 'number',
      markdownParser : 'function',
      parseHTML      : 'boolean',
      parseMarkdown  : 'boolean',
      placeholder    : 'string',
      showPreview    : 'boolean',
      value          : 'string'
    };

    this.toggles = {
      empty   : true,
      focused : false,
    }

    this.invoke(essence);
  }

  createEvents() {
    const parts = this.parts;

    this.on('blur', e => {
      this.setToggle('focused', false);
      this.setState('value', parts.input.value);
    }, parts.input);

    this.on('focus', e => {
      this.setToggle('focused', true);
    }, parts.input);

    this.on('input', e => {
      this.setState('length', parts.input.value.length);
    }, parts.input);
  }

  onStateChange(stateName, newValue, oldValue) {
    this.render();
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

  renderLabel(label) {
    this.parts.label.innerText = label;
    return label;
  }

  renderLength(newLength = 0, oldLength = 0) {
    let parts = this.parts;
    this.setToggle('empty', !(newLength || this.states.placeholder));

    if (this.states.autoResize) {
      let styles = window.getComputedStyle(parts.input);
      let minHeight = parseInt(styles['min-height']);
      let maxHeight = parseInt(styles['max-height']);

      const addHeightCondition = () => {
        let scrollCheck = parts.input.scrollHeight > parts.input.clientHeight;
        let maxHeightCheck = isNaN(maxHeight) || parts.input.offsetHeight < maxHeight;
        return (scrollCheck && maxHeightCheck);
      }

      const removeHeightCondition = () => {
        let scrollCheck = parts.input.scrollHeight <= parts.input.clientHeight;
        let minHeightCheck = isNaN(minHeight) || parts.input.offsetHeight > minHeight;
        return (scrollCheck && minHeightCheck);
      }

      const addHeight = () => {
        while (addHeightCondition()) {
          parts.input.style.height = (parts.input.offsetHeight + 1) + 'px' ;
        }
      }

      const removeHeight = () => {
        while (removeHeightCondition()) {
          parts.input.style.height = (parts.input.offsetHeight - 1) + 'px' ;
        }
      }

      if (newLength > oldLength) {
        addHeight();
      } else if (newLength < oldLength) {
        removeHeight();
        addHeight();
      }
    }

    return newLength;
  }

  renderPlaceholder(placeholder) {
    this.setAttribute('placeholder', placeholder, this.parts.input);
    this.setToggle('empty', placeholder ? false : true);
    return placeholder;
  }

  renderShowPreview(showPreview) {
    let parts = this.parts;
    this.removeAllChildren();

    if (!showPreview) {
      this.add(parts.label).add(parts.input);
    } else {
      this.add(parts.rendered);
    }
    return showPreview;
  }

  renderValue(value) {
    let key = this.getState('key');
    let signalValue = this.states.key ? { [key]: value } : value;
    this.signalParent('VALUE_CHANGED', signalValue);
    this.render();

    return value;
  }

  togglePreview(isToShowPreview = !this.states.showPreview) {
    this.setState('showPreview', isToShowPreview);
  }

  toggleHTML(isToParseHTML = !this.states.parseHTML) {
    this.setState('parseHTML', isToParseHTML);
  }

  toggleMarkdown(isToParseMarkdown = !this.states.parseMarkdown) {
    this.setState('parseMarkdown', isToParseMarkdown);
  }
};