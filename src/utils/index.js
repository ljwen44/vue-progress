function isObject(obj) {
	return typeof obj === 'object' && obj != null
}

export function looseEqual(a, b, condition = () => false) {
	if (a === b) {
		return true
	}
	var isObjectA = isObject(a)
	var isObjectB = isObject(b)
	if (isObjectA && isObjectB) {
		try {
			var isArrayA = Array.isArray(a)
			var isArrayB = Array.isArray(b)
			if (isArrayA && isArrayB) {
				let bol =
				a.length === b.length &&
				a.every(function(e, i) {
					return looseEqual(e, b[i], condition)
				})
				return bol
			} else if (a instanceof Date && b instanceof Date) {
				return a.getTime() === b.getTime()
			} else if (!isArrayA && !isArrayB) {
				var keysA = Object.keys(a)
				var keysB = Object.keys(b)
				return (
					keysA.length === keysB.length &&
					keysA.every(function(key) {
						if (condition(key)) {
							return true
						}
						return looseEqual(a[key], b[key], condition)
					})
				)
			} else {
				return false
			}
		} catch (e) {
			return false
		}
	} else if (!isObjectA && !isObjectB) {
		return String(a) === String(b)
	} else {
		return false
	}
}