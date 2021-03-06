Module.Editor = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Editor';

    this.parts = {
      header  : Component('Block').setAlias('EditorHead'),
      body    : Component('Block').setAlias('EditorBody'),
      form    : Component('Block').setAlias('EditorForm'),
      buttons : Component('Block').setAlias('EditorButtons'),
      title   : Component('Text').setAlias('EditorTitle'),
      save    : Component('Button', { text: 'Save' }).setAlias('Button'),
      publish : Component('Button', { text: 'Publish' }).setAlias('Button'),
      archive : Component('Button', { text: 'Archive' }).setAlias('Button'),
    }

    this.props = {
      context        : '',
      changes        : {},
      document       : {},
      documentValues : {},
      parseHTML      : true,
      schema         : {},
      showPreview    : false,
    }

    this.propTypes = {
      context      : 'string',
      changes      : 'object',
      document     : 'object',
      parseHTML    : 'boolean',
      schema       : 'object',
      showPreview  : 'boolean',
    }

    this.toggles = {
      preview : true,
    }

    this.invoke(essence);
  }

  addSchemaEvents(fieldElemental, events = []) {
    for (let event of events) {
      fieldElemental.on(event.on, e => { $E.events[this.states.context][event.name](e, fieldElemental) }, event.part);
    }
    return this;
  }

  applyChanges(value) {
    let currentDocument = this.getState('document');
    let currentValues = this.getState('documentValues');
    let originalValues = this.getProp('documentValues');
    let changes  = this.getState('changes');

    for (let fieldName in value) {
      let newValue = value[fieldName];
      if (JSON.stringify(newValue) === JSON.stringify(originalValues[fieldName])) {
        delete changes[fieldName];
      } else {
        changes[fieldName] = newValue;
      }
      currentValues[fieldName] = newValue;
    }
    if (currentDocument.hasOwnProperty('values')) {
      currentDocument.values = currentValues;
    } else {
      currentDocument = currentValues;
    }
    this.setStates({ changes: changes, document: currentDocument, documentValues: currentValues });
  }

  createField(field = {}, key, value) {
    let essence = {
      label: field.label,
      key: key,
      showPreview: this.getState('showPreview'),
      parseHTML: this.getState('parseHTML'),
      value: value || '',
    };
    switch (field.presentation) {
      case 'autocomplete':
        essence.type = 'autocomplete';
        return Component('TextField', essence);
      case 'checkbox':
        return Component('Checkbox', essence);
      case 'heading': 
        return Component('Text', essence).setAlias('Heading');
      case 'nested':
        return this.createNestedField(field, key, value);
      case 'markdown':
        essence.showToggles = true;
        return Component('TextArea', essence);
      case 'select':
        essence.options = field.restrictions ? field.restrictions.enums : [];
        return Component('Selector', essence);
      case 'textarea':
        return Component('TextArea', essence);
      case 'text':
        return Component('TextField', essence);
      default:
    }
  }

  createFields() {
    if (this.wasInvoked) {
      let documentValues = this.getState('documentValues');
      let schemaJSON = this.getState('schema');
      let parts = this.parts;
      let fields = schemaJSON.fields || [];

      parts.form.removeAllChildren();
      parts.title.setState('value', schemaJSON.name || "");

      for (let field of fields) {
        let value = documentValues[field.key];
        let fieldElemental = this.createField(field, field.key, value);
        this.addSchemaEvents(fieldElemental, field.events);
        parts.form.add(fieldElemental);
      }
    }
  }

  createNestedField(nestedField = {}, key, values = []) {
    let nested = Component('NestedField', { key: key, value: values, label: nestedField.label });
    let fields = nestedField.fields;
    let i = 0;
    for (let value of values) {
      let group = Component('Block').setAlias('NestedGroup');
      nested.parts.body.add(group);
      for (let field of fields) {
        let fieldElemental = this.createField(field, i + ' ' + field.key, value[field.key]);
        this.addSchemaEvents(fieldElemental, field.events);
        group.add(fieldElemental);
      }
      i++;
    }
    // If no value exists, we need to create the empty fields in our nested field
    if (i === 0) {
      let group = Component('Block').setAlias('NestedGroup');
      nested.parts.body.add(group);
      for (let field of fields) {
        let fieldElemental = this.createField(field, i + ' ' + field.key, value[field.key]);
        this.addSchemaEvents(fieldElemental, field.events);
        group.add(fieldElemental);
      }      
    }
    return nested;
  }

  processSignal(signal, value, origin) {
    switch (signal) {
      case 'CONTEXT_CHANGED':
        this.setState('context', value);
        break;
      case 'VALUE_CHANGED':
        this.applyChanges(value);
        return 'STOP';
      default:
    }
    return this;
  }

  render() {
    const parts = this.parts;

    this.add(parts.header
          .add(parts.buttons)
          .add(parts.title))
        .add(parts.body
          .add(parts.form));
 
    this.renderContext();

    return this;
  }

  renderContext(newValue, oldValue) {
    if (this.wasInvoked) {
      this.props.document = this.states.document = Documents[newValue] || {};
      this.props.schema = this.states.schema = Schemas[newValue] || {};
      this.props.documentValues = this.states.documentValues = this.states.document.hasOwnProperty('values') ? this.states.document.values : this.states.document;
      this.createFields();
    }
  }

  renderParseHTML(newValue, oldValue) {
    this.signalChildren('PARSE_HTML', newValue);
  }

  renderShowPreview(showPreview) {
    this.signalChildren('PREVIEW_CHANGED', showPreview);
    this.setToggle('preview', showPreview);
    return this;
  }

  togglePreview(isToShowPreview = !this.states.showPreview) {
    this.setState('showPreview', isToShowPreview);
    return this;
  }

  toggleHTML(isToParseHTML = !this.states.parseHTML) {
    this.setState('parseHTML', isToParseHTML);
  }
}