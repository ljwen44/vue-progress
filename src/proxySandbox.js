export default class proxySandbox {
	// 激活
	active() {
		this.sandboxRunning = true;
	}
	// 失活
	inactive() {
		this.sandboxRunning = false;
	}
	constructor(name, context = {}) {
		this.name = name
		this.proxy = null
		this.sandboxRunning = false
		const fakeWindow = Object.create({});
		const proxy = new Proxy(fakeWindow, {
			set: (target, name, value) => {
				if (this.sandboxRunning) {
					if (Object.keys(context).includes(name)) {
						context[name] = value;
					}
					target[name] = value;
				}
				return true
			},
			get: (target, name) => {
				if (Object.keys(context).includes(name)) {
					return context[name];
				}
				return target[name];
			}
		})
		this.proxy = proxy
	}
}
