import Notifier from '../observer/Notifier';

class Mediator extends Notifier {
	constructor(mediatorName, viewComponent) {
		super();
		this.mediatorName = mediatorName || this.constructor.NAME;
		this.viewComponent = viewComponent || null;
	}

	getMediatorName() {
		return this.mediatorName;
	}

	setViewComponent(viewComponent) {
		this.viewComponent = viewComponent;
	}

	getViewComponent() {
		return this.viewComponent;
	}

	listNotificationInterests() {
		return [];
	}

	handleNotification() {
		return;
	}

	onRegister() {
		return;
	}

	onRemove() {
		return;
	}
}

Mediator.NAME = 'Mediator';

export default Mediator;
