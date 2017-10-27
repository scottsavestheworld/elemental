Component.Search = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Search';

    this.parts = {
      input : document.createElement('input'),
    }

    this.props = {
      inputBuffer   : 500,        // Delay in milliseconds to start query when typing
      placeholder   : 'Search',   // Text to display when search field is empty
      query         : '',         // Current query
      queryMinimum  : 1,          // Minimum query length required to search
      queryTarget   : () => {},   // Function that expects arguments: (origin, query, timestamp)
      results       : {},         // Query results
      resultsTarget : () => {},   // Function to send results to
      value         : '',         // Text to display in the search field
    }

    this.propTypes = {
      inputBuffer   : 'number',
      placeholder   : 'string',
      query         : 'string',
      queryMinimum  : 'number',
      queryTarget   : 'function',
      results       : 'object',
      resultsTarget : 'function',
    };

    this.toggles = {
      focused   : false,
      searching : false,
    }

    this.invoke(essence);
  }

createEvents() {
    let parts = this.parts;

    this.on('mousedown', e => {
      this.parts.input.focus();
      e.preventDefault();
    });

    this.on('mousedown', e => { 
      e.stopPropagation(); 
    }, parts.input);

    this.on('blur', e => {
      this.setToggle('focused', false);
      this.setState('query', parts.input.value);
    }, parts.input);

    this.on('focus', e => {
      this.setToggle('focused', true);
    }, parts.input);

    this.on('input', this.onInput(), parts.input);
  }

  onInput() {
    let timeout = null;
    let parts = this.parts;

    return e => {
      let query = parts.input.value;

      clearTimeout(timeout);
      this.setToggle('searching', false);

      if (this.states.inputBuffer >= 0) {
        timeout = setTimeout(() => {
          if (this.toggles.focused) {
            this.setState('query', query);
          }
        }, this.states.inputBuffer);
      } else {
        this.setState('query', query);
      }
    }
  }

  render() {
    this.add(this.parts.input);
  }

  renderPlaceholder(placeholder) {
    this.setAttribute('placeholder', placeholder, this.parts.input);
  }

  renderResults(newResults = {}, oldResults = {}) {
    if (newResults.query === this.states.query) {
      if (typeof this.states.resultsTarget === 'function') {
        this.states.resultsTarget(newResults, oldResults);
      }    
      this.setToggle('searching', false);
    }
  }

  renderState(stateName, newValue, oldValue) {
    switch (stateName) {
      case 'query':
        this.submitQuery(newValue);
        break;
      case 'placeholder':
        this.renderPlaceholder(newValue);
        break;
      case 'results':
        this.renderResults(newValue, oldValue);
        break;
      case 'value':
        this.renderValue(newValue, oldValue);
        break;
      default:
    }
  }

  renderValue(value) {
    this.parts.input.value = value;
    this.setState('query', value);
  }

  submitQuery(query) {
    if (query.length >= this.states.queryMinimum) {
      this.setToggle('searching', true);
      if (typeof this.states.queryTarget === 'function') {
        this.states.queryTarget(this, query, Date.now());
      }
    } else {
      this.setState('results', { query: '' });
      this.onInput.call(this);
    }
  }
}