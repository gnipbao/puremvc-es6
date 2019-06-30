import Notifier from '../observer/Notifier';
export default class MacroCommand extends Notifier {
	constructor() {
		super();
		this.subCommands = [];
		this.initializeMacroCommand();
	}
	initializeMacroCommand() {}

	addSubCommand(commandClassRef) {
		this.subCommands.push(commandClassRef);
	}

	execute(note) {
		while (this.subCommands.length > 0) {
			let ref = this.subCommands.shift();
			let cmd = new ref();
			cmd.initializeNotifier(this.multitonKey);
			cmd.execute(note);
		}
	}
}
