import Interceptor from './Interceptor.js'

class Dom extends Interceptor {
    static hooks = {
        watchMethods: ['mount', 'registerConsole', 'consoleLog'],
        beforeMethodCall(name, args) {
            if (['mount', 'registerConsole'].includes(name)) {
                if (!(document.querySelector(args) instanceof HTMLElement)) {
                    throw new TypeError(`Please pass the query selector of an HTML element to the ${name} method.`)
                }
            }

            if (name === 'mount') {
                console.log('The app will mount.')
            }

            if (name === 'registerConsole') {
                console.log('The console will be registered.')
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
        return this
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

    consoleLog(data) {
        this.consoleRoot.innerHTML += `<p>${data}</p>`
        return this
    }
}

export default Dom
