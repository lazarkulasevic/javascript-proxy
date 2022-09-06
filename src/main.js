import Dom from './core/Dom.js'
import AppButton from './components/AppButton.js'
import ConsoleOutput from './components/ConsoleOutput.js'
import './style.css'

const app = new Dom({
    components: [AppButton, ConsoleOutput]
}).mount('#app')

app.registerConsole('#console-output')
    .registerButton('.my-button', handleClick)

function handleClick() {
    const btnClassList = app.buttonElement.classList
    btnClassList.toggle('red')
    app.consoleLog(`The button is now ${btnClassList.contains('red') ? 'red' : 'blue'}.`)
}
