Module.Menu = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.alias = 'Menu';

    this.parts = {
        content       : Component('Button', { text: 'Content', value: 'content' }).setAlias('MenuItem'),
        ecommerce     : Component('Button', { text: 'E-Commerce', value: 'ecommerce' }).setAlias('MenuItem'),
        home          : Component('Button', { text: 'Home', value: 'home' }).setAlias('MenuItem'),
        leads         : Component('Button', { text: 'Leads', value: 'leads' }).setAlias('MenuItem'),
        locations     : Component('Button', { text: 'Locations', value: 'locations' }).setAlias('MenuItem'),
        logo          : Component('Image').setAlias('Logo'),
        organizations : Component('Button', { text: 'Organizations', value: 'organizations' }).setAlias('MenuItem'),
        settings      : Component('Button', { text: 'Settings', value: 'settings' }).setAlias('MenuItem'),
        signOut       : Component('Button', { text: 'Sign Out', value: 'signOut' }).setAlias('SignOut'),
        sites         : Component('Button', { text: 'Sites', value: 'sites' }).setAlias('MenuItem'),
        users         : Component('Button', { text: 'Users', value: 'users' }).setAlias('MenuItem'),
    }

    this.props = {
      layout: [
        'logo',
        'home', 
        'organizations', 
        'locations', 
        'ecommerce', 
        'content', 
        'leads', 
        'sites', 
        'users',
        'settings',
        'signOut'
      ],
      context: '',
    }

    this.invoke(essence);
  }

  processSignal(signal, value, origin) {
    switch (signal) {
      case 'CONTEXT_CHANGED':
        this.setState('context', value);
        break;
      case 'MENUITEM_CLICKED':
        this.setState('context', value);
      default:
    }
    return this;
  }

  renderLayout(newLayout, oldLayout) {
    $E.renderLayout(this, newLayout, oldLayout);
  }

  renderContext(newValue, oldValue) {
    let parts = this.parts;

    if (parts[oldValue]) { parts[oldValue].setToggle('selected', false); }
    if (parts[newValue]) { parts[newValue].setToggle('selected', true, true); }

    this.signalParent('CONTEXT_CHANGED', newValue);
  }

  renderState(stateName, newValue, oldValue) {
    switch (stateName) {
      case 'layout':
        this.renderLayout(newValue, oldValue);
      break;
      case 'context':
        this.renderContext(newValue, oldValue);
      break;
      default:
    }
  }
};