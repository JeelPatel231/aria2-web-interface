import { DOWNLOADS_ARRAY, showNotification, updateCurrentTabArray, WS } from "./store"

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

export const mapOfIdFunctions = {
    // additions and removals
    "adduri" : handleUpdates,
    "addtorrent" : handleUpdates,
    "remove": handleUpdates,

    // status updates
    "tellactive" : handleUpdates,
    "tellwaiting" : handleUpdates,
    "tellstopped" : handleUpdates,
    
    // pause unpause, own functions
    "pause": (_) => {WS.tellActive()},
    "unpause": (_) => {WS.tellWaiting()},
}