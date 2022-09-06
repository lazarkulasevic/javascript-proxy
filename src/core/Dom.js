import Interceptor from './Interceptor.js'

class Dom extends Interceptor {
    static hooks = {
        watchMethods: ['mount', 'registerConsole', 'consoleLog', 'registerButton'],
        beforeMethodCall(name, args) {
            if (['mount', 'registerConsole'].includes(name)) {
                if (!(document.querySelector(args) instanceof HTMLElement)) {
                    throw new TypeError(`Please pass the query selector of an HTML element to the ${name} method.`)
                }
            }

            if (name === 'mount') {
                console.log(`The app will mount on root "${args}".`)
            }

            if (name === 'registerConsole') {
                console.log(`The console will be registered on root "${args}".`)
            }

            if (name === 'registerButton') {
                console.log(`The button will be registered on root "${args[0]}".`)
            }

            if (name === 'consoleLog') {
                console.log(`New log at ${new Date().toLocaleString('en-GB')}:`, ...args)
            }
        }
    }

    /**
     * @constructor
     * @param {Array} components
     */
    constructor({ components }) {
        super(Dom.hooks)
        this.components = components
        this.root = undefined
        this.consoleRoot = undefined
        this.buttonRoot = undefined
        return this
    }

    get buttonElement() {
        return this.buttonRoot
    }

    /**
     * @param {String} root
     */
    mount(root) {
        this.root = document.querySelector(root)
        this.root.innerHTML = this.components.map(component => component.html).join('')

        console.log('The app is mounted.')
        return this
    }

    /**
     * @param {String} root
     */
    registerConsole(root) {
        this.consoleRoot = document.querySelector(root)

        console.log('The console is registered.')
        return this
    }

    /**
     * @param {String} data
     */
    consoleLog(data) {
        this.consoleRoot.innerHTML += `<p>${data}</p>`
        return this
    }

    /**
     * @param {String} root
     * @param {Function} handler
     */
    registerButton(root, handler) {
        this.buttonRoot = document.querySelector(root)
        this.buttonRoot.addEventListener('click', handler)

        console.log('The button is registered.')
        return this
    }
}

export default Dom
