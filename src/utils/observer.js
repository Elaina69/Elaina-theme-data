const CALLBACK_TYPES = {
  ID: 'id',
  TAG: 'tag',
  CLASS: 'class'
};

class DomObserver {
  constructor() {
    this._callbackStore = {
      creation: {
        [CALLBACK_TYPES.ID]: new Map(),
        [CALLBACK_TYPES.TAG]: new Map(),
        [CALLBACK_TYPES.CLASS]: new Map()
      },
      deletion: {
        [CALLBACK_TYPES.ID]: new Map(),
        [CALLBACK_TYPES.TAG]: new Map(),
        [CALLBACK_TYPES.CLASS]: new Map()
      }
    };

    this._observerConfig = {
      attributes: false,
      childList: true,
      subtree: true
    };

    this._observer = new MutationObserver((mutations) => this._observerCallback(mutations));
    this._observer.observe(document, this._observerConfig);
  }

  _addCallback(target, callback, callbackMap) {
    const key = target.startsWith('.') || target.startsWith('#')
      ? target.slice(1)
      : target;

    if (!callbackMap.has(key)) {
      callbackMap.set(key, []);
    }
    callbackMap.get(key).push(callback);
  }

  _getType(target) {
    if (target.startsWith('.')) return CALLBACK_TYPES.CLASS;
    if (target.startsWith('#')) return CALLBACK_TYPES.ID;
    return CALLBACK_TYPES.TAG;
  }

  subscribeToElementCreation(target, callback) {
    this._addCallback(target, callback, this._callbackStore.creation[this._getType(target)]);
  }

  subscribeToElementDeletion(target, callback) {
    this._addCallback(target, callback, this._callbackStore.deletion[this._getType(target)]);
  }

  handleElementMutation(element, isCreation, callbacks) {
    if (!callbacks || typeof callbacks !== 'object') {
      console.error('Invalid callbacks object:', callbacks);
      return;
    }

    const { id, tagName, classList } = element;

    if (id && callbacks[CALLBACK_TYPES.ID]?.get) {
      callbacks[CALLBACK_TYPES.ID].get(id)?.forEach(cb => cb(element));
    }

    if (callbacks[CALLBACK_TYPES.TAG]?.get) {
      callbacks[CALLBACK_TYPES.TAG].get(tagName.toLowerCase())?.forEach(cb => cb(element));
    }

    if (classList && callbacks[CALLBACK_TYPES.CLASS]?.get) {
      classList.forEach(className => {
        callbacks[CALLBACK_TYPES.CLASS].get(className.toLowerCase())?.forEach(cb => cb(element));
      });
    }

    Array.from(element.children).forEach(child => this.handleElementMutation(child, isCreation, callbacks));

    if (element.shadowRoot) {
      Array.from(element.shadowRoot.children).forEach(child => this.handleElementMutation(child, isCreation, callbacks));

      if (isCreation) {
        this._observer.observe(element.shadowRoot, this._observerConfig);
      }
    }

    if (element.tagName.toLowerCase() === 'iframe') {
      try {
        const iframeDocument = element.contentDocument || element.contentWindow.document;
        if (iframeDocument) {
          this._observer.observe(iframeDocument, this._observerConfig);
          Array.from(iframeDocument.body.children).forEach(child =>
            this.handleElementMutation(child, isCreation, callbacks)
          );
        }
      }
      catch (e) {
        console.warn('Unable to access iframe content. It may be cross-origin.', e);
      }
    }
  }

  _observerCallback(mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          this.handleElementMutation(node, true, this._callbackStore.creation);
        }
      });

      mutation.removedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          this.handleElementMutation(node, false, this._callbackStore.deletion);
        }
      });
    });
  }
}

const domObserver = new DomObserver();

const subscribeToElementCreation = (...args) => domObserver.subscribeToElementCreation(...args);
const subscribeToElementDeletion = (...args) => domObserver.subscribeToElementDeletion(...args);

export { domObserver, subscribeToElementCreation, subscribeToElementDeletion };

window.observer = {
  handleElementMutation: (...args) => domObserver.handleElementMutation(...args),
  subscribeToElementCreation,
  subscribeToElementDeletion
};