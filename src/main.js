import './style.css'
import Dom from './core/Dom.js'
import AppButton from './components/AppButton.js'
import ConsoleOutput from './components/ConsoleOutput.js'

const app = new Dom({
    components: [AppButton, ConsoleOutput]
}).mount('#app')

app.registerConsole('#console-output')

document.querySelector('.my-button').addEventListener('click', () => {
    app.consoleLog('Clicked the button!')
})
