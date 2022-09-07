import Dom from './core/Dom.js'
import AppButton from './components/AppButton.js'
import ConsoleOutput from './components/ConsoleOutput.js'

const app = new Dom({
    components: [AppButton, ConsoleOutput]
}).mount('#app')

app.registerConsole('#console-output')
    .registerButton('.my-button', handleClick)

function handleClick() {
    const btnClassList = app.buttonElement.classList
    btnClassList.toggle('red')

    const btnColor = btnClassList.contains('red')
        ? '<span class="text-red">red</span>'
        : '<span class="text-blue">blue</span>'

    app.consoleLog(`The button is now ${btnColor}.`)
}
