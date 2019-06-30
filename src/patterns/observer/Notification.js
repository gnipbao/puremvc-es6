export default class Notification {
	constructor(name, body, type) {
		this.name = name || null;
		this.body = body || null;
		this.type = type || null;
	}

	getName() {
		return this.name;
	}

	setBody(body) {
		this.body = body;
	}

	getBody() {
		return this.body;
	}

	setType(type) {
		this.type = type;
	}

	getType() {
		return this.type;
	}

	toString() {
		let msg = 'Notification Name: ' + this.getName();
		msg += '\nBody:' + (this.body == null ? 'null' : this.body.toString());
		msg += '\nType:' + (this.type == null ? 'null' : this.type);
		return msg;
	}
}
