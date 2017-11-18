Module.App = class extends Elemental {
  constructor(essence = {}) {
    super();
    this.element = document.body;
    this.alias = 'App';

    this.parts = {
      dashboard : Module('Dashboard'),
      editor    : Module('Editor'),
      header    : Module('Header'),
      list      : Module('List'),
      login     : Module('Login'),
    }

    this.props = {
      context  : 'content',
      layout   : {
        'home'   : ['header', 'dashboard'],
        'editor' : ['editor'],
        'list'   : ['header', 'list'],
        'login'  : ['login'],
      },
      locale   : '',
      screen   : 'editor',
      userID   : '',
      userName : '',
    }

    this.propTypes = {
      context  : [
        'content', 'ecommerce', 'home', 'leads','locations', 
        'login','organizations', 'settings', 'sites', 'users' 
      ],
      layout   : 'fixed',
      screen   : [ 'editor', 'home', 'list', 'login' ],
    }

    this.signals = {
      'OFFCLICK' : [],
    },
  
    this.invoke(essence);
  }

  createEvents() {
    this.on('mousedown', (event) => { this.onClick(event) });
  }

  onClick(event) {
    for (let signalee of this.signals.OFFCLICK) {
      this.signal(signalee, 'OFFCLICK');
    }
  }

  registerOffClick(value, origin) {
    let index = this.signals.OFFCLICK.indexOf(origin);
    if (value && index === -1) {
      this.signals.OFFCLICK.push(origin);
    }
    else if (!value && index >= 0) {
      this.signals.OFFCLICK.splice(index, 1);
    }
  }

  processSignal(signal, value, origin) {
    switch (signal) {
      case 'CONTEXT_CHANGED':
        this.setState('context', value);
        break;
      case 'REGISTER_OFFCLICK':
        this.registerOffClick(value, origin);
        break;
      default:
    }
    return this;
  }

  renderContext(context) {
    this.signalParts('CONTEXT_CHANGED', context);
    this.setAttribute('context', context);
  }

  renderScreen(newValue = '', oldValue = '') {
    let newLayout = this.getProp('layout')[newValue] || [];
    let oldLayout = this.getProp('layout')[oldValue] || [];
 
    $E.renderLayout(this, newLayout, oldLayout);
  }

  render() {
  }
}