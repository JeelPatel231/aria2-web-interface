import type { DownloadDataEntry } from '../interfaces/downloadEntry';
import { Writable, writable } from 'svelte/store';
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

async function k() {
    await new Promise(r => setTimeout(r, 200));
    WS.wsreq("adduri","aria2.addUri",[["https://speed.hetzner.de/1GB.bin"]])
    // WS.wsreq("adduri","aria2.addUri",[["magnet:?xt=urn:btih:51818AF477A5A40398BCA294CDEFF6615EF21E21&dn=The+Founder+%282016%29+%5B1080p%5D+%5BYTS%5D+%5BYIFY%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce"]])
    WS.wsreq('tellactive','aria2.tellActive',
                            [['gid','status','totalLength','completedLength','uploadLength',
                            'downloadSpeed','uploadSpeed','infoHash','numSeeders','pieceLength',
                            'numPieces','connections','errorCode','files','bittorrent']]);
}
k()