import { Writable, writable } from 'svelte/store';
import { AriaWebSocket } from './websockutils';

// can try to use local storage of browser to reference the same but aight
export const WS_RPC_URL = writable("ws://localhost:6800/jsonrpc");
export const WS_RPC_SECRET = writable("");
export const WS_POLL_INTERVAL = writable(3000); // poll interval in ms, default = 3s or 3000ms

export const ACTIVE_DOWNLOADS = writable([]) // active downloads global array 
export const WAITING_DOWNLOADS = writable([]) // waiting downloads global array 
export const STOPPED_DOWNLOADS = writable([]) // stopped downloads global array 

// POLLING FUNCTION LOOPERS, so i start/can stop polling from any component
export const ACTIVE_POLL = writable(0);
export const WAITING_POLL = writable(0);
export const STOPPED_POLL = writable(0);

// WEBSOCKET OBJECT
export let WS : AriaWebSocket;

//  run when WS_RPC_URL changes
WS_RPC_URL.subscribe((value) => {
    console.log("changed value of websocket URL")
    WS = new AriaWebSocket(value);
})

export const isDarkTheme = writable(true)

// when the variable isDarkTheme changes
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
