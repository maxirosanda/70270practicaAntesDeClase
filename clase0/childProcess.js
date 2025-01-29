import { config } from './src/config/config.js'
import express from 'express'
import {fork} from 'child_process'

const app = express()

function operacionCompleja() {
    let result = 0;

    for (let i = 0; i < 5e9; i++) {
        result += i;
    }

    return result;
}

app.get('/suma', (req, res) => {
    const result = operacionCompleja()
    res.send(`El resultado de la operación es ${result}`);
});
app.get('/suma2', (req, res) => {
    const child = fork('./operacionCompleja.js');
    child.send('start');
    child.on('message', (result) => {
        res.send(`El resultado de la operación es ${result}`);
    });
});
let counter = 0
app.get('/', (req, res) => {
    counter++
    res.send(`Counter: ${counter}`)
})
app.listen(config.port, () => {
  console.log('Server listening on port ' + config.port)
})