import Interceptor from './Interceptor.js'

/**
 * @extends Interceptor
 */
class Dom extends Interceptor {
    static options = {
        watchMethods: ['mount', 'registerConsole', 'registerButton', 'consoleLog'],
        beforeMethodCall(name, args) {
            if (['mount', 'registerConsole', 'registerButton'].includes(name)
                && !(document.querySelector(args[0]) instanceof HTMLElement)) {
                throw new TypeError(`Please pass the query selector of an HTML element to the ${name} method.`)
            }
            switch (name) {
                case 'mount':
                    console.log(`The app will mount on root "${args}".`)
                    break
                case 'registerConsole':
                    console.log(`The console will be registered on root "${args}".`)
                    break
                case 'registerButton':
                    console.log(`The button will be registered on root "${args[0]}".`)
                    break
                case 'consoleLog':
                    const msg = `New HTML output log at ${new Date().toLocaleString('en-GB')}: ${args}`
                    console.log(msg)
                    // Alert instead of console log on mobile device
                    if (window.matchMedia('(max-width: 475px)').matches) {
                        alert(msg)
                    }
                    break
            }
        }
    }

    /**
     * @param {Array} components
     */
    constructor({ components }) {
        super(Dom.options)
        this.components = components
        this.root = undefined
        this.consoleRoot = undefined
        this.buttons = {}
        return this
    }

    /**
     * @param {String} root
     */
    buttonElement(root) {
        return this.buttons[root]
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
     * @param {String} root
     * @param {Function} handler
     */
    registerButton(root, handler) {
        this.buttons[root] = document.querySelector(root)
        this.buttons[root].addEventListener('click', handler)
        console.log('The button is registered.')
        return this
    }

    /**
     * @description This method is not being watched
     * @param {String} data
     */
    log(data) {
        this.consoleRoot.innerHTML += `<p>${data}</p>`
        return this
    }

    /**
     * @param {String} data
     */
    consoleLog(data) {
        this.log(data)
        return this
    }
}

export default Dom
