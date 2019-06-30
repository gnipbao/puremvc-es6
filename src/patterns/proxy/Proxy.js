import Notifier from '../observer/Notifier';

export default class Proxy extends Notifier {
	constructor(proxyName, data) {
		super();
		this.data = null;
		this.proxyName = proxyName || this.constructor.NAME;
		if (data != null) {
			this.setData(data);
		}
	}

	getProxyName() {
		return this.proxyName;
	}

	setData(data) {
		this.data = data;
	}

	getData() {
		return this.data;
	}

	onRegister() {}

	onRemove() {}
}

Proxy.NAME = 'Proxy';
