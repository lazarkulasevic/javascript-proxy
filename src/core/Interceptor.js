class Interceptor {
    /**
     * @param {Object} hooks
     * @param {String[]} hooks.watchMethods - method names
     * @param {Function} [hooks.beforeMethodCall] - code block that executes before the method functionality
     * @return {Proxy}
     */
    constructor(hooks) {
        return Interceptor.#proxy(this, hooks)
    }

    static #proxy(obj, hooks) {
        return new Proxy(obj, {
            get(target, prop) {
                if (typeof target[prop] === 'function' && hooks.watchMethods.includes(prop)) {
                    return new Proxy(target[prop], {
                        apply(target, thisArg, argumentsList) {
                            hooks.beforeMethodCall(prop, argumentsList)
                            return Reflect.apply(target, thisArg, argumentsList)
                        }
                    })
                } else {
                    return Reflect.get(target, prop)
                }
            }
        })
    }
}

export default Interceptor
