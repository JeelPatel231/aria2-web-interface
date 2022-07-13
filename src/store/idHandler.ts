import { DOWNLOADS_ARRAY, WS } from "./store"

const handleError = (e) => {
    // template error handling function, thinking of a toast message on error
    DOWNLOADS_ARRAY.set([])
    console.log("error",e)
}

const handleUpdates = (e) => {
    console.log(e)
    WS.tellActive()
}

export const mapOfIdFunctions = {
    // everything is set to console log for now
    "adduri" : handleUpdates,
    "addtorrent" : handleUpdates,
    "tellactive" : (e) => {
                        if (e.error != undefined ){handleError(e);return}
                        DOWNLOADS_ARRAY.set(e.result)
                    },
    "tellwaiting" : (e) => {
                        if (e.error != undefined ){handleError(e);return}
                        DOWNLOADS_ARRAY.set(e.result)
                    },
    "tellstopped" : (e) => {
                        if (e.error != undefined ){handleError(e);return}
                        DOWNLOADS_ARRAY.set(e.result)
                    },
    "pause": handleUpdates,
    "unpause": handleUpdates,
    "remove": handleUpdates,
}