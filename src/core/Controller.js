import Observer from '../patterns/observer/Observer';
import View from './View';
class Controller {
	constructor(key) {
		if (!Controller.instanceMap.has(key)) {
			throw new Error(Controller.MULTITON_MSG);
		}
		this.view = null;
		this.multitonKey = key || null;
		Controller.instanceMap.set(key, this);
		this.commandMap = new Map();
		this.initializeController();
	}

	static getInstance(key) {
		if (null == key) return;
		if (null == this.instanceMap.get(key)) {
			this.instanceMap.set(key, new this(key));
		}

		return this.instanceMap.get(key);
	}

	static removeController(key) {
		this.instanceMap.delete(key);
	}

	executeCommand(note) {
		let commandClassRef = this.commandMap.get(note.getName());
		if (commandClassRef == null) return;
		let commandInstance = new commandClassRef();
		commandInstance.initializeNotifier(this.multitonKey);
		commandInstance.execute(note);
	}

	initializeController() {
		this.view = View.getInstance(this.multitonKey);
	}

	registerCommand(notificationName, commandClassRef) {
		if (!this.commandMap.has(notificationName)) {
			this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
		}
		this.commandMap.set(notificationName, commandClassRef);
	}

	hasCommand(notificationName) {
		return this.commandMap.has(notificationName);
	}

	removeCommand(notificationName) {
		if (this.hasCommand(notificationName)) {
			this.view.removeObserver(notificationName, this);
			this.commandMap.delete(notificationName);
		}
	}
}

/**
 * Multiton key to Controller instance mappings
 *
 * @static
 * @protected
 * @type {Object}
 */
Controller.instanceMap = new Map();

/**
 * @ignore
 *
 * Message constants
 * @static
 * @protected
 * @type {string}
 */
Controller.MULTITON_MSG = 'controller key for this Multiton key already constructed';
export default Controller;
