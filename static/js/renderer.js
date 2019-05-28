'use strict'

const ioHook = require('iohook')
const { ipcRenderer } = require('electron')

let clear
let ProxyState = { counter: 0 }

const content = document.querySelector("#content")

const Render = ( DOM, element ) => { DOM.innerHTML = element }

const App = ( counter, point ) => `
  <div class="counter ${CounterColor(counter)}">${counter}</div>
  ${ point ? `<div class="point">${point}</div>` : `` }
`

const AppBuild = ( counter, callback ) => {
  Render(content, App(counter))
  ipcRenderer.send('order', true)
  if ( callback ) { callback() }
}

const CounterUp = () => {
  let counter = ProxyState.counter += 1

  AppBuild(counter, () => {
    clearTimeout(clear)
    clear = setTimeout(() => {
      CounterClear()
    }, 3000)
  })
}

const CounterClear = () => {
  let counter = ProxyState.counter = 0

  AppBuild(counter)
}

const CounterColor = ( counter ) => { }

ioHook.on('keypress', event => {
  CounterUp()
})

ioHook.start()
