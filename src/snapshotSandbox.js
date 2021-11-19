export default class snapshotSandbox {
	constructor(name) {
		this.name = name;
		this.modifyMap = {}; // 存放修改的属性
		this.windowSnapshot = {};
	}
	active() {
		// 缓存active状态的沙箱
		this.windowSnapshot = {};
		for (const item in window) {
			this.windowSnapshot[item] = window[item];
		}

		Object.keys(this.modifyMap).forEach(p => {
			window[p] = this.modifyMap[p];
		})
	}
	inactive() {
		for (const item in window) {
		if (this.windowSnapshot[item] !== window[item]) {
			// 记录变更
			this.modifyMap[item] = window[item];
			// 还原window
			window[item] = this.windowSnapshot[item];
			}
		}
	}
}
