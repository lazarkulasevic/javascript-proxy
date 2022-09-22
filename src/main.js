import Dom from './core/Dom.js'
import AppButtons from './components/AppButtons.js'
import ConsoleOutput from './components/ConsoleOutput.js'

const app = new Dom({
    components: [AppButtons, ConsoleOutput]
}).mount('#app')

app.registerConsole('#output')
    .registerButton('.super-spy-btn', handleSpyBtn)
    .registerButton('.regular-btn', handleRegularBtn)

function handleSpyBtn() {
    const btnColor = handleBtn('.super-spy-btn', 'red')
    app.consoleLog(`The button is now ${btnColor}.`)
}

function handleRegularBtn() {
    const btnColor = handleBtn('.regular-btn', 'orange')
    app.log(`The button is now ${btnColor}.`)
}

function handleBtn(btnSelector, btnColor) {
    const btnClassList = app.buttonElement(btnSelector).classList
    btnClassList.toggle(btnColor)

    const buttonHtml = btnClassList.contains(btnColor)
        ? `<span class="text-${btnColor}">${btnColor}</span>`
        : '<span class="text-blue">blue</span>'

    return buttonHtml
}
