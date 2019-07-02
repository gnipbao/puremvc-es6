import Controller from '../../core/Controller';
import View from '../../core/View';
import Model from '../../core/Model';
class Facade {
	constructor(key) {
		if (Facade.instanceMap.has(key)) {
			throw new Error(Facade.MULTITON_MSG);
		}
		this.model = null;
		this.view = null;
		this.controller = null;
		this.multitonKey = null;

		this.initializeNotifier(key);
		Facade.instanceMap.set(key, this);
		this.initializeFacade();
	}

	static getInstance(key) {
		if (null == key) return null;
		if (!Facade.instanceMap.has(key)) {
			Facade.instanceMap.set(key, new Facade(key));
		}
		return Facade.instanceMap.get(key);
	}

	static hasCore(key) {
		return Facade.instanceMap.has(key);
	}

	static removeCore(key) {
		if (!Facade.instanceMap.has(key)) return;

		Model.removeModel(key);
		View.removeView(key);
		Controller.removeController(key);
		Facade.instanceMap.delete(key);
	}

	initializeFacade() {
		this.initializeModel();
		this.initializeController();
		this.initializeView();
	}

	initializeController() {
		if (this.controller !== null) return;
		this.controller = Controller.getInstance(this.multitonKey);
	}

	initializeModel() {
		if (this.model != null) return;

		this.model = Model.getInstance(this.multitonKey);
	}

	initializeView() {
		if (this.view != null) return;

		this.view = View.getInstance(this.multitonKey);
	}

	registerCommand(notificationName, commandClassRef) {
		this.controller.registerCommand(notificationName, commandClassRef);
	}

	removeCommand(notificationName) {
		this.controller.removeCommand(notificationName);
	}

	hasCommand(notificationName) {
		return this.controller.hasCommand(notificationName);
	}

	registerProxy(proxy) {
		this.model.registerProxy(proxy);
	}

	retrieveProxy(proxyName) {
		return this.model.retrieveProxy(proxyName);
	}

	removeProxy(proxyName) {
		let proxy = null;
		if (this.model != null) {
			proxy = this.model.removeProxy(proxyName);
		}

		return proxy;
	}

	hasProxy(proxyName) {
		this.model.hasProxy(proxyName);
	}

	registerMediator(mediator) {
		if (this.view != null) {
			this.view.registerMediator(mediator);
		}
	}

	retrieveMediator(mediatorName) {
		return this.view.retrieveMediator(mediatorName);
	}

	removeMediator(mediatorName) {
		let mediator = null;
		if (this.view != null) {
			mediator = this.view.removeMediator(mediatorName);
		}

		return mediator;
	}

	hasMediator(mediatorName) {
		return this.view.hasMediator(mediatorName);
	}

	sendNotification(notificationName, body, type) {
		this.notifyObservers(new Notification(notificationName, body, type));
	}

	notifyObservers(notification) {
		if (this.view != null) {
			this.view.notifyObservers(notification);
		}
	}

	initializeNotifier(key) {
		this.multitonKey = key;
	}
}

/**
 * @ignore
 * The Multiton Facade instance map.
 * @static
 * @protected
 * @type Map
 */
Facade.instanceMap = new Map();

/**
 * @ignore
 * Message Constants
 * @protected
 * @type {string}
 * @const
 * @static
 */
Facade.MULTITON_MSG = 'Facade instance for this Multiton key already constructed!';

export default Facade;
