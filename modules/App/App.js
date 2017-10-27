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
  
    this.invoke(essence);
  }

  processSignal(signal, value, origin) {
    switch (signal) {
      case 'CONTEXT_CHANGED':
        this.setState('context', value);
        break;
      default:
    }
    return this;
  }

  renderContext(newValue, oldValue) {
    this.signalParts('CONTEXT_CHANGED', newValue);
    this.setAttribute('context', newValue);
  }

  renderScreen(newValue = '', oldValue = '') {
    let newLayout = this.getProp('layout')[newValue] || [];
    let oldLayout = this.getProp('layout')[oldValue] || [];
 
    $E.renderLayout(this, newLayout, oldLayout);
  }

  render() {
  }
}