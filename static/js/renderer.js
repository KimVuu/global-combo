'use strict'

const ioHook = require('iohook')

const { ipcRenderer } = require('electron')

let counter = document.querySelector(".counter")
let clear

const content = document.querySelector("#content")

const Render = ( DOM, element ) => { DOM.innerHTML = element }

const _set = ( n ) => {
  Render(content, `<div class="counter">${n}</div>`)
  ipcRenderer.send('order', true)
}

const _clear_timeout = () => {
  clearTimeout(clear)
  clear = setTimeout(() => {
    CounterClear()
  }, 3000)
}

const CounterUp = () => {
  ProxyState.counter += 1
  _set(ProxyState.counter)
  _clear_timeout()
}
const CounterClear = () => {
  ProxyState.counter = 0
  _set(ProxyState.counter)
}

let ProxyState = { counter: 0 }

ioHook.on('keypress', event => {
  CounterUp()
})

ioHook.start()
