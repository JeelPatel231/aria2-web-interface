import { DOWNLOADS_ARRAY, CURRENT_DETAIL, showNotification, updateCurrentTabArray, WS } from "./store"

const handleUpdates = (e) => {
    // if error, handle error first and return
    if (e.error != undefined ){
        DOWNLOADS_ARRAY.set([])
        showNotification({head:e.error.message,desc:[{gid:"code: "+e.error.code}],error:true})
        console.log("error",e)
        return
    }
    // if no error, check if the download array need to be updated
    if(e.id.substring(0,4) === "tell"){
        DOWNLOADS_ARRAY.set(e.result)
        return
    }
    // if a download is added, tell active instantly
    if(e.id.substring(0,3) === "add"){
        WS.tellActive()
        return
    }

    // finally if nothing, update the current tab
    updateCurrentTabArray()

}

// https://stackoverflow.com/a/68315766
const hex2bin = (data) => data.split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('');

const tellStatusHandler = (e) => {
    CURRENT_DETAIL.set(e.result)
}

export const mapOfIdFunctions = {
    // additions and removals
    "adduri" : handleUpdates,
    "addtorrent" : handleUpdates,
    "remove": handleUpdates,

    // status updates
    "tellactive" : handleUpdates,
    "tellwaiting" : handleUpdates,
    "tellstopped" : handleUpdates,
    "tellstatus" : tellStatusHandler,
    
    // pause unpause, own functions
    "pause": (_) => {WS.tellActive()},
    "unpause": (_) => {WS.tellWaiting()},
}