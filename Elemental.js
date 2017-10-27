const Elemental = class {
  constructor(essence = {}, attributes = {}) {
    // essence: will override this.props as the starting props
    // attributes: will be added as attributes to this.element

    this.alias = '';
    // Type of Elemental (this will be the class name in the DOM)

    this.isBasic = false;
    // Basic Elementals cannot have children

    this.isElemental = true;
    // Identifies this class as an Elemental

    this.children = [];
    // Child Elementals that are added to the Elemental with add()

    this.element = document.createElement('div');
    // Outermost DOM element

    this.owner = null;
    // Owner Elemental to which this is a part in its this.parts

    this.parent = null;
    // Parent Elemental to which this is a child in its this.children

    this.parts = {};
    // Elementals and elements that make up the Elemental

    this.props = {};
    // Initial custom properties of the Elemental (these should genrally be immutable)

    this.propTypes = {};
    // Expected primitive types for props

    this.states = {};
    // Current state of each custom property in this.props (these are mutable)

    this.toggles = {};
    // Current state of toggles. e.g., { selected: true, expanding: false }
  
    this.wasInvoked = false;
    // Sets to true after the Elemental's construction is complete
  }

  add(child, toIndex) {
    if (this.isBasic) {
      $E.error(`Elemental.add: Unable to add a child to ${this.alias}. Basic elements cannot have children.`);
      return this;
    }
    if (child) {
      if (child.parent && child.parent.isElemental) {
        child.parent.remove(child);
      }

      let children = this.children;
      let childElement = child.isElemental ? child.element : child;
      let index = Number.isInteger(toIndex) ? toIndex : children.length;

      if (index < 0) { 
        index = children.length + index;
        if (index < 0) { index = 0 }
      }

      if (index >= children.length) {
        children.push(child);
        this.element.appendChild(childElement);
      } else {
        children.splice(index, 0, child);
        this.element.insertBefore(childElement, this.element.children[index]);
      }
      child.parent = this;
    }
    return this;
  }

  addClass(...classNames) {
    this.element.classList.add(...classNames);
    return this;
  }

  createEvents() {
    // This is where custom events are created
    return this;
  }

  createStates() {
    // Creates the state object from props
    this.setStates(this.getProps(), true);
    return this;
  }

  forEachChild(methodName, ...args) {
    // Runs the designated method on each child Elemental
    for (let child of this.children) {
      if (typeof child[methodName] === 'function') {
        child[methodName](...args);
      }
    }
    return this;
  }

  forEachPart(methodName, ...args) {
    // Runs the designated method on each part of the Elemental
    let parts = this.parts;
    for (let partName in parts) {
      if (typeof parts[partName][methodName] === 'function') {
        parts[partName][methodName](...args);
      }
    }
    return this;
  }

  getAttribute(attributeName) {
    return this.element.getAttribute(attributeName);
  }

  getPart(partName) {
    // Returns the Elemental's part by name
    return this.part[partName];
  }

  getParts(...partNames) {
    // Returns the original parts
    // If names are provided, the corresponding parts will be returned
    // If no names are provided, all parts will be returned
    let parts = this.parts;
    if (partNames.length) {
      let results = {};
      for (let partName of partNames) {
        results[partName] = parts[partName];
      }
      return results;
    }

    return parts;
  }

  getProp(propName) {
    // Returns a prop value by name
    return typeof this.props[propName] !== 'function' ? JSON.parse(JSON.stringify(this.props[propName])) : this.props[propName];
  }
  
  getProps(...propNames) {
    // If names are provided, the corresponding props will be returned
    // If no names are provided, all props will be returned
    let props = this.props;
    if (propNames.length) {
      let results = {};
      for (let propName of propNames) {
        results[propName] = this.getProp(propName);
      }
      return results;
    }

    return Object.assign({}, props);
  }

  getState(stateName) {
    // Returns a state value by name
    return typeof this.states[stateName] !== 'function' ? JSON.parse(JSON.stringify(this.states[stateName])) : this.states[stateName];
  }

  getStates(...stateNames) {
    // If names are provided, the corresponding states will be returned
    // If no names are provided, all states will be returned
    let states = this.states;
    if (stateNames.length) {
      let results = {};
      for (let stateName of stateNames) {
        results[stateName] = this.getState(stateName);
      }
      return results;
    }
    return Object.assign({}, states);
  }

  hasClass(className) {
    return this.element.classList.contains(className);
  }

  invoke(essence = {}, attributes = {}) {
    if ($E.isDebugMode) {
      this.element.elemental = this;
    }
    this.forEachPart('setOwner', this);
    this.setClass();
    this.setAttributes(attributes);
    this.setProps(essence);
    this.createStates();
    this.createEvents();
    this.wasInvoked = true;
    this.render();

    return this;
  }

  on(events, handler, element = this.element) {
    if (!element instanceof HTMLElement) {
      $E.warn(
        `Elemental.on: Attempting to set an event listener for ${events} on a non-DOM element. 
        Make sure the supplied element is a DOM element and not an Elemental.`
      );
      return this;
    }
    let eventsArray = events.trim().split(' ');
    for (let event of eventsArray) {
      element.addEventListener(event, handler);
    }
    return this;
  }

  onStateChange(stateName, newValue, oldValue) {
    // Is called after state updates and render[StateName]() does not exist
  }

  off(event, handler, element) {
    if (!element instanceof HTMLElement) {
      $E.warn(
        `Elemental.off: Attempting to remove an event listener for ${events} on a non-DOM element. 
        Make sure the supplied element is a DOM element and not an Elemental.`
      );
      return this;
    }
    let eventsArray = events.trim().split(' ');
    for (let event of eventsArray) {
      element.removeEventListener(event, handler);
    }
    return this;
  }

  processSignal(signal, origin) {
    // Receives and processes update objects
    return this;
  }
  
  remove(child) {
    // Removes a child from the DOM
    if (child) {
      let children = this.children;
      let childElement = child.isElemental ? child.element : child;
      let index = children.indexOf(child);

      if (index > -1) {
        children.splice(index, 1);
        child.parent = null;
      }

      if (this.element && this.element.contains(childElement)) {
        this.element.removeChild(childElement);
      }
    }
    return this;
  }

  removeAllChildren() {
    // Removes all children from DOM and this.children
    let children = this.children;
    let total = children.length - 1;
    for (let i = total; i >= 0; i--) {
      this.remove(children[i]);
    }
    return this;
  }

  removeAllParts(exceptions = []) {
    // Removes all parts from the DOM (does not remove from this.parts)
    let parts = this.parts;
    for (let partName in parts) {
      if (exceptions.indexOf(partName) < 0) {
        parts[partName].removeSelf();
      }
    }
    return this;
  }

  removeClass(...classNames) {
    // Removes style class from this.element
    this.element.classList.remove(...classNames);
    this.setClass();
    return this;
  }

  removeSelf() {
    // Removes this from its parent Elemental
    if (this.parent) {
      this.parent.remove(this);
    }
    return this;
  }

  render() {
    // Render the entire Elemental
  }

/*render[StateName]() {
    When a state is updated, this.render[StateName]() will be called. For example
    this.setState('value', 'somevalue') will update the 'value' state, and then call this.renderValue(newValue, oldValue)
    If the this.renderValue() method does not exist, the default this.onStateChange(stateName, newValue, oldValue) will be called.

    ** Note, the first letter of the state name in this.render[StateName]() name will be capitalized, even if the state name is not.
  }*/

  reset() {
    this.forEachPart('reset');
    this.resetStates();
    this.render();

    return this;
  }

  resetState(stateName) {
    // Sets the state value to match the initial prop value
    this.setState(stateName, this.getProp(stateName));
    return this;
  }

  resetStates(...stateNames) {
    // Sets the state value to match the initial prop value
    if (stateNames.length) {
      for (let stateName of states) {
        this.resetState(stateName);
      }
    } else {
      this.setStates(this.props);
    }
    return this;
  }

  receiveSignal(signal, value, stopPropagation, origin, target) {
    let propagate = this.processSignal(signal, value, origin);
    if (!stopPropagation && propagate !== 'STOP') {
      this['signal' + target](signal, value, stopPropagation, origin);
    }
    return this;
  }

  setOwner(owner) {
    if (owner && owner.isElemental) {
      this.owner = owner;
    } else {
      this.owner = null;
    }
    return this;
  }

  setAlias(alias) {
    if ($E.string(alias, false) && alias.indexOf(' ') < 0) {
      if (this.alias) {
        this.element.classList.remove(this.alias);
      }
      this.alias = alias;
      this.setClass();
    } else {
      $E.warn(`Elemental.setAlias: "${alias}" is not a valid alias. Make sure the alias is a valid CSS class name with no spaces.`);
    }
    return this;
  }

  setAttribute(attributeName = '', attributeValue = '', element = this.element) {
    if (attributeName) {
      if (!element instanceof HTMLElement) { 
        $E.warn(
          `Elemental.setAttribute: Attempting to set an attribute, ${attributeName}, on a non-DOM element. 
          Make sure the supplied element is a DOM element and not an Elemental.`
        );
        return this;
      }
      if (attributeValue) {
        if (attributeValue === true) {
          attributeValue = '';
        }
        if (attributeName.toLowerCase() === 'class' && element === this.element) {
          this.setClass(attributeValue);
          return this;
        }
        element.setAttribute(attributeName, attributeValue);
      } else {
        element.removeAttribute(attributeName);
      }
    }
    return this;
  }

  setAttributes(attributes = {}, element) {
    for (let attribute in attributes) {
      this.setAttribute(attribute, attributes[attribute], element);
    }
    return this;
  }

  setClass(classNameString = this.element.className) {
    // Processess this.element className and insures that this.alias comes first
    let classList = [];
    let classNames = classNameString.split(' ');

    if (this.alias != '') { classList.push(this.alias); }

    for (let toggle in this.toggles) {
      let toggleClass = 'is-' + toggle;
      let toggleValue = this.toggles[toggle];

      if (toggleValue) {
        classList.push(toggleClass);
      } else {
        classNames.splice(classNames.indexOf(toggleClass), 1);
      }
    }

    for (let className of classNames) {
      if (className.length && classList.indexOf(className) === -1) {
        classList.push(className);
      }
    }

    this.element.className = classList.join(' ').trim();
    return this;
  }

  setProps(propsObject = {}, allowNewProps) {
    for (let propName in propsObject) {
      this.setProp(propName, propsObject[propName]);
    }
    return this;
  }

  setProp(propName, newValue, allowNewProps) {
    let props = this.props;
    let propTypes = this.propTypes;

    if (propTypes[propName] === 'fixed') {
      $E.warn(`Element.setProp: The ${this.alias} prop, "${propName}", is a fixed property and cannot be modified.`);
      return this;
    }

    if (props.hasOwnProperty(propName) || allowNewProps) {
      if (!propTypes.hasOwnProperty(propName) || $E.validateType(propTypes[propName], newValue)) {
        props[propName] = newValue;
      } else {
        $E.warn(`Elemental.setProp: Invalid propType for the ${this.alias} prop, "${propName}". Expected "${propTypes[propName]}".`);
      }
    }
    return this;
  }

  setState(stateName, newValue, allowNewStates) {
    // Sets the state if it has changed
    let propTypes = this.propTypes;
    let states = this.states;

    if (states.hasOwnProperty(stateName) || allowNewStates) {
      if (propTypes.hasOwnProperty(stateName) && !$E.validateType(propTypes[stateName], newValue)) {
        if (propTypes[stateName] === 'fixed') {
          if (!(allowNewStates && typeof states[stateName] === 'undefined')) {
            return this;
          }
        } else {
          $E.warn(`Elemental.setState: Invalid propType for the ${this.alias} prop, "${stateName}". Expected "${propTypes[stateName]}".`);
          return this;
        }
      }
      if (!this.props.hasOwnProperty(stateName)) {
        this.setProp(stateName, newValue, true);
      }
      if (states[stateName] !== newValue) {
        let oldValue = states[stateName];
        let renderMethod = 'render' + $E.capitalize(stateName);
        states[stateName] = newValue;
        if (typeof this[renderMethod] === 'function') {
          this[renderMethod](newValue, oldValue);
        } else {
          this.onStateChange(stateName, newValue, oldValue);
        }
      }
    }
    return this;
  }

  setStates(stateObject = {}, allowNewStates) {
    for (let stateName in stateObject) {
      this.setState(stateName, stateObject[stateName], allowNewStates);
    }
    return this;
  }

  toggle(toggleName) {
    if (this.toggles.hasOwnProperty(toggleName)) {
      this.toggles[toggleName] = !this.toggles[toggleName];
      this.setClass();
    }
    return this;
  }

  setToggle(toggleName, toggleBoolean = false, allowNewToggles) {
    if ((this.toggles.hasOwnProperty(toggleName) && this.toggles[toggleName] != toggleBoolean) || allowNewToggles) {
      this.toggles[toggleName] = toggleBoolean;
      this.setClass();
    }
    return this;
  }

  setToggles(toggleObject = {}, allowNewToggles) {
    for (let toggleName in toggleObject) {
      this.setToggle(toggleName, toggleObject[toggleName], allowNewToggles);
    }
    return this;
  }

  signal(target, signal, value, origin) {
    let signalOrigin = origin || this;
    if ($E.object(target, false) && target.isElemental) {
      target.receiveSignal(signal, value, true, origin);
    }
    return this;
  }

  signalChildren(signal, value, stopPropagation, origin) {
    let signalOrigin = origin || this;
    this.forEachChild('receiveSignal', signal, value, stopPropagation, origin, 'Children');
    return this;
  }

  signalOwner(signal, value, stopPropagation, origin) {
    if (this.owner && this.owner.isElemental) {
      let signalOrigin = origin || this;
      this.owner.receiveSignal(signal, value, stopPropagation, origin, 'Owner');
    }
    return this;
  }

  signalParent(signal, value, stopPropagation, origin) {
    if (this.parent && this.parent.isElemental) {
      let signalOrigin = origin || this;
      this.parent.receiveSignal(signal, value, stopPropagation, origin, 'Parent');
    }
    return this;
  }

  signalParts(signal, value, stopPropagation, origin) {
    let signalOrigin = origin || this;
    this.forEachPart('receiveSignal', signal, value, stopPropagation, origin, 'Parts');
    return this;
  }

  toggleClass(className, addClass = !this.hasClass(className)) {
    let addRemove = addClass ? 'add' : 'remove';
    this[addRemove + 'Class'](className);
    return this;
  }
}