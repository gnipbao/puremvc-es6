import Observer from '../patterns/observer/Observer';
class View {
	constructor(key) {
		if (View.instanceMap.has(key)) {
			throw new Error(View.MULTITON_MSG);
		}
		this.multitonKey = key;
		View.instanceMap.set(this.multitonKey, this);

		this.mediatorMap = new Map();
		this.observerMap = new Map();
	}

	static removeView(key) {
		View.instanceMap.delete(key);
	}

	static getInstance(key) {
		if (null == key) return null;
		if (!View.instanceMap.has(key)) {
			View.instanceMap.set(key, new View(key));
		}
		return View.instanceMap.get(key);
	}

	initializeView() {
		return;
	}

	registerObserver(notificationName, observer) {
		if (this.observerMap.has(notificationName)) {
			this.observerMap.get(notificationName).push(observer);
		} else {
			this.observerMap.set(notificationName, [observer]);
		}
	}

	notifyObservers(notification) {
		if (this.observerMap.get(notification.getName())) {
			let obserbers_ref = this.observerMap.get(notification.getName()),
				observers = [],
				observer;
			for (let i = 0; i < obserbers_ref.length; i++) {
				observer = obserbers_ref[i];
				observers.push(observer);
			}
			observers.forEach((observer) => {
				observer.notifyObserver(notification);
			});
		}
	}

	removeObserver(notificationName, notifyContext) {
		let observers = this.observerMap.get(notificationName);
		for (let i = 0; i < observers.length; i++) {
			if (observers[i].compareNotifyContext(notifyContext) === true) {
				observers.splice(i, 1);
				break;
			}
		}

		if (observers.length === 0) {
			this.observerMap.delete(notificationName);
		}
	}

	registerMediator(mediator) {
		if (this.mediatorMap.get(mediator.getMediatorName())) return;
		// register the mediator for retrieval by name
		mediator.initializeNotifier(this.multitonKey);

		// get notification interests if any
		let interests = mediator.listNotificationInterests();

		if (interests.length > 0) {
			// create observer referencing this mediators handleNotification method
			let observer = new Observer(mediator.handleNotification, mediator);
			for (let i = 0; i < interests.length; i++) {
				this.registerObserver(interests[i], observer);
			}
		}
		mediator.onRegister();
	}

	/**
	 * Retrieve a Mediator from the View
	 *
	 * @param {string} mediatorName
	 * @returns {puremvc.Mediator}
	 * @memberof View
	 */
	retrieveMediator(mediatorName) {
		return this.mediatorMap.get(mediatorName);
	}

	removeMediator(mediatorName) {
		let mediator = this.mediatorMap.get(mediatorName);
		if (mediator) {
			// for every notification the mediator is interested in ...
			let interests = mediator.listNotificationInterests();
			for (let i = 0; i < interests.length; i++) {
				// remove the observer linking the mediator to the notifiaction
				// interest
				this.removeObserver(interests[i], mediator);
			}
			// remove the mediator from the map
			this.mediatorMap.delete(mediatorName);
			// alert the mediator that it has been removed
			mediator.onRemove();
		}
		return mediator;
	}

	hasMediator(mediatorName) {
		return this.mediatorMap.has(mediatorName);
	}
}

View.instanceMap = new Map();
/**
 * @ignore
 * The error message used if an attempt is made to instantiate View directly
 *
 * @type string
 * @protected
 * @const
 * @static
 */
View.MULTITON_MSG = 'View instance for this Multiton key already constructed!';

export default View;
