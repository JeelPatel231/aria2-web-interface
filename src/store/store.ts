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
