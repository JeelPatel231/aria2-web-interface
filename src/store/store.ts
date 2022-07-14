import type { DownloadDataEntry } from '../interfaces/downloadEntry';
import type { Toast } from '../interfaces/toast';
import { get, Writable, writable } from 'svelte/store';
import { AriaWebSocket } from './websockutils';

// can try to use local storage of browser to reference the same but aight
export const WS_RPC_URL: Writable<string> = writable("ws://localhost:6800/jsonrpc");
export const WS_RPC_SECRET: Writable<string> = writable("");
export const WS_POLL_INTERVAL: Writable<number> = writable(3000); // poll interval in ms, default = 3s or 3000ms

export const DOWNLOADS_ARRAY: Writable<DownloadDataEntry[]> = writable([]) // active downloads global array 

// POLLING FUNCTION LOOPERS, so i start/can stop polling from any component
// https://stackoverflow.com/a/56239226
export const ACTIVE_POLL: Writable<ReturnType<typeof setTimeout>> = writable();
export const WAITING_POLL: Writable<ReturnType<typeof setTimeout>> = writable();
export const STOPPED_POLL: Writable<ReturnType<typeof setTimeout>> = writable();

// toasts queue
export const TOAST_QUEUE: Writable<Toast[]> = writable([]);

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

export const showNotification = (err:Toast) => {
    TOAST_QUEUE.set([ ...(get(TOAST_QUEUE)) , err ]) // assign this way for reactivity
    
    // remove element from the queue after 5000ms
    setTimeout(()=>{
        get(TOAST_QUEUE).shift();
        TOAST_QUEUE.set(get(TOAST_QUEUE)) // assign for reactivity
    }, 5000 ) // 5000ms timeout to clear notification
    
}