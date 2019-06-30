class Model {
	constructor(key) {
		if (!Model.instanceMap.has(key)) {
			throw new Error(Model.MULTITON_MSG);
		}
		this.multitonKey = key || null;
		Model.instanceMap.set(key, this);
		this.proxyMap = new Map();
		this.initializeModel();
	}

	static getInstance(key) {
		if (null === key) return;
		if (!Model.instanceMap.has(key)) {
			Model.instanceMap.set(key, new Model(key));
		}
		return Model.instanceMap.get(key);
	}

	static removeModel(key) {
		Model.instanceMap.delete(key);
	}

	initializeModel() {}

	/**
	 * Register a Proxy with the Model
	 * @param {puremvc.Proxy} proxy
	 */
	registerProxy(proxy) {
		proxy.initializeNotifier(this.multitonKey);
		this.proxyMap.set(proxy.getProxyName(), proxy);
		proxy.onRegister();
	}
	/**
	 * Retrieve a Proxy from the Model
	 *
	 * @param {string} proxyName
	 * @returns {puremvc.Proxy} the Proxy instance previously registered with the provided proxyName
	 * @memberof Model
	 *
	 */
	retrieveProxy(proxyName) {
		return this.proxyMap.get(proxyName);
	}

	hasProxy(proxyName) {
		return this.proxyMap.has(proxyName);
	}

	removeProxy(proxyName) {
		let proxy = this.proxyMap.get(proxyName);
		if (proxy) {
			this.proxyMap.delete(proxyName);
			proxy.onRemove();
		}
		return proxy;
	}
}

/**
 * @ignore
 * The map used by the Model to store multiton instances
 *
 * @protected
 * @static
 * @type Array
 */
Model.instanceMap = new Map();

/**
 * @ignore
 * Message Constants
 *
 * @static
 * @type {string}
 */
Model.MULTITON_MSG = 'Model instance for this Multiton key already constructed!';

export default Model;
