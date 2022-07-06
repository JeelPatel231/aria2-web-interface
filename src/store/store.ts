import { get, writable } from 'svelte/store';

const assignAllHandlers = (sock) => {
    sock.onopen = (e) => console.log(e)
    sock.onmessage = (e) => console.log(e)
}

// can try to use local storage of browser to reference the same but aight
export const WS_RPC_URL = writable("ws://localhost:6800/jsonrpc");
export const WS_RPC_SECRET = writable("");

// WEBSOCKET HANDLERS
let WS : WebSocket = new WebSocket(get(WS_RPC_URL));

WS_RPC_URL.subscribe((value) => {
    console.log("changed value of websocket URL")
    WS = new WebSocket(value);
    assignAllHandlers(WS)
})

export const isDarkTheme = writable(false)

isDarkTheme.subscribe((value)=>{
    // why if else and not direct toggling?
    // because 3rd option will be "Auto" in future
    // so if its neither light or dark theme, it will be auto
    if(value){
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
    }
    if(!value){
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
    }
})
