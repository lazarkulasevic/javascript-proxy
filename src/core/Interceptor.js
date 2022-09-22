class Interceptor {
    /**
     * @param {Object} options
     * @param {String[]} options.watchMethods - method names
     * @param {Function} [options.beforeMethodCall] - code block that executes before the method functionality
     * @return {Proxy}
     */
    constructor(options) {
        return Interceptor.#proxy(this, options)
    }

    static #proxy(obj, options) {
        return new Proxy(obj, {
            get(target, prop) {
                if (typeof target[prop] === 'function' && options.watchMethods.includes(prop)) {
                    return new Proxy(target[prop], {
                        apply(target, thisArg, argumentsList) {
                            options.beforeMethodCall(prop, argumentsList)
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
