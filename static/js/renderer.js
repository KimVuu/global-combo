'use strict'

const ioHook = require('iohook')

const { ipcRenderer } = require('electron')

let counter = document.querySelector(".counter")
let n = 0
let clear

const _set = ( n ) => {
    counter.innerHTML = n
    counter.classList.add('up')
    ipcRenderer.send('order', true)
    setTimeout(() => {
        counter.classList.remove('up')
    }, 10);
    if ( n ) {
        _clear_timeout()
    }
}

const _clear_timeout = () => {
    clearTimeout(clear)
    clear = setTimeout(() => {
        _set(0)
        n = 0
    }, 3000)
}

ioHook.on('keypress', event => {
    _set(++n)
})

ioHook.start()