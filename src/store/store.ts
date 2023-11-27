import type { DownloadDataEntry } from '../interfaces/downloadEntry';
import type { Toast } from '../interfaces/toast';
import { get, Writable, writable } from 'svelte/store';
import { AriaWebSocket } from './websockutils';

const WS_RPC_STORE_KEY = "LOCAL_WS_RPC_URL"

const ENV_HOST = import.meta.env.VITE_HOST ?? "localhost"

const lastUsedRpcUrl = localStorage.getItem(WS_RPC_STORE_KEY) ?? `ws://${ENV_HOST}:6800/jsonrpc`
console.info("using last saved URL", lastUsedRpcUrl)

export const WS_RPC_URL: Writable<string> = writable(lastUsedRpcUrl);
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

// active tab
export const activeTab: Writable<string> = writable("play_arrow") // default is active downloads
activeTab.subscribe(()=>{DOWNLOADS_ARRAY.set([])}) // clear downloads array when value is changed

export const CSS_URL: Writable<string> = writable("") // custom theme URL
// change href of the given link id in main page
CSS_URL.subscribe((val)=>{
    document.getElementById("custom-css-link").setAttribute("href",val)
})

// WEBSOCKET OBJECT
export let WS : AriaWebSocket;

//  run when WS_RPC_URL changes
WS_RPC_URL.subscribe((value) => {
    console.log("changed value of websocket URL")
    localStorage.setItem(WS_RPC_STORE_KEY, value)
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

export const CURRENT_DETAIL:Writable<DownloadDataEntry> = writable(null) // detail pane data
setInterval(()=>{
    let curr = get(CURRENT_DETAIL)
    if(!curr || curr.status == "complete") return
    WS.tellStatus(curr.gid)
},get(WS_POLL_INTERVAL))

export const showNotification = (err:Toast) => {
    TOAST_QUEUE.set([ ...(get(TOAST_QUEUE)) , err ]) // assign this way for reactivity
    
    // remove element from the queue after 5000ms
    setTimeout(()=>{
        get(TOAST_QUEUE).shift();
        TOAST_QUEUE.set(get(TOAST_QUEUE)) // assign for reactivity
    }, 5000 ) // 5000ms timeout to clear notification
    
}

export const updateCurrentTabArray = () => {
    switch(get(activeTab)){
        case "play_arrow": {
            WS.tellActive();
            break;
        }
        case "pause":{
            WS.tellWaiting();
            break;
        } 
        case "stop":{
            WS.tellStopped();
            break;
        }
    }
}

export const getCardTitle = (data) => {
    const getBaseNameSanitised = (path) => {
        return path.split('/').filter(n=>n).reverse()[0]
    }

    //if file is torrent, this must be defined
    if (data.bittorrent){
        if (data.bittorrent.info) return data.bittorrent.info.name
    }
    // if file is from normal URL, path should contain fileName
    if (data.files[0].path !== "") return getBaseNameSanitised(data.files[0].path)

    // if download fails, the URL should contain the name
    // split query params and get vanilla url
    return getBaseNameSanitised(data.files[0].uris[0].uri.split('?',1)[0])
}

// https://stackoverflow.com/a/18650828
export const formatBytes = (num: string, decimals:number = 2) : string => {
    let bytes:number =  parseInt(num)

    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
