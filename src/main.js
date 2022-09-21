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
    const btnClassList = app.buttonElement('.super-spy-btn').classList
    btnClassList.toggle('red')

    const btnColor = btnClassList.contains('red')
        ? '<span class="text-red">red</span>'
        : '<span class="text-blue">blue</span>'

    app.consoleLog(`The button is now ${btnColor}.`)
}

function handleRegularBtn() {
    const btnClassList = app.buttonElement('.regular-btn').classList
    btnClassList.toggle('orange')

    const btnColor = btnClassList.contains('orange')
        ? '<span class="text-orange">orange</span>'
        : '<span class="text-blue">blue</span>'

    app.log(`The button is now ${btnColor}.`)
}
