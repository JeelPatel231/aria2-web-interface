import { WS_RPC_SECRET, WS_POLL_INTERVAL } from "./store"; // websocket vars
import { ACTIVE_POLL, WAITING_POLL, STOPPED_POLL } from "./store"; // poller functions
import { get } from "svelte/store";
import { mapOfMethodFunctions } from "./methodHandler";
import { mapOfIdFunctions } from "./idHandler";

export class AriaWebSocket {
    readonly WS : WebSocket;
    
    constructor(uri:string){
        this.WS = new WebSocket(uri);
        this.setupWebSocket()
    }
    
    setupWebSocket = () => {
        // on socket open
        this.WS.onopen = (e) => console.log(e)
        // on socket message
        this.WS.onmessage = (e) => this.onMessageHandler(e)
    }
    
    onMessageHandler = (e) => { // handle the event
        let data = JSON.parse(e.data) // turn data string into object
        // console.log("data.method",data.method)
        // console.log("data.id",data.id)
        // console.log(data)
        if (data.method !== undefined){
            mapOfMethodFunctions[data.method](data) // do whatever with the METHOD
            return
        }
        mapOfIdFunctions[data.id](data) // else do whatever with the ID
    }

    wsreq = (id:string, method:string, params) => {
        if(this.WS.readyState !== 1){
            console.log('Connection lost or not yet open!');
            return
        };
        var json = {
            jsonrpc:'2.0',
            id:id,
            method:method,
            params:(typeof params===typeof undefined)?[]:params
        };
        
        if(get(WS_RPC_SECRET)){
            json.params.unshift('token:'+get(WS_RPC_SECRET));
        };

        this.WS.send(JSON.stringify(json));
    };


    // CALLS START HERE
    tellActive = () => { this.wsreq('tellactive','aria2.tellActive',
                        [['gid','status','totalLength','completedLength','uploadLength',
                        'downloadSpeed','uploadSpeed','infoHash','numSeeders','pieceLength',
                        'numPieces','connections','errorCode','files','bittorrent']]);}

    tellWaiting = () => { this.wsreq('tellwaiting','aria2.tellWaiting', 
                        [0,0,['gid','status','totalLength','completedLength','uploadLength',
                        'downloadSpeed','uploadSpeed','infoHash','numSeeders','pieceLength',
                        'numPieces','connections','errorCode','files','bittorrent']]);}

    tellStopped = () => { this.wsreq('tellstopped','aria2.tellStopped',
                        [0,0,['gid','status','totalLength','completedLength','uploadLength',
                        'downloadSpeed','uploadSpeed','infoHash','numSeeders','pieceLength',
                        'numPieces','connections','errorCode','files','bittorrent']]);}


    startActivePolling = () => {
        this.tellActive() // make the first query without waiting
        ACTIVE_POLL.set( setInterval(this.tellActive, get(WS_POLL_INTERVAL)) ) // then set time interval
    }
    startWaitingPolling = () => {
        this.tellWaiting() // make the first query without waiting
        WAITING_POLL.set( setInterval(this.tellWaiting, get(WS_POLL_INTERVAL)) ) // then set time interval
    }
    startStoppedPolling = () => {
        this.tellStopped() // make the first query without waiting
        STOPPED_POLL.set( setInterval(this.tellStopped, get(WS_POLL_INTERVAL)) ) // then set time interval
    }

    clearActivePolling = () => clearInterval(get(ACTIVE_POLL));
    clearWaitingPolling = () => clearInterval(get(WAITING_POLL));
    clearStoppedPolling = () => clearInterval(get(STOPPED_POLL));
}