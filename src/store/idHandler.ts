import { DOWNLOADS_ARRAY } from "./store"

export const mapOfIdFunctions = {
    // everything is set to console log for now
    "adduri" : console.log,
    "addtorrent" : console.log,
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
    "pause": console.log,
    "unpause": console.log,
    "remove": console.log,
}

const handleError = (e) => {
    // template error handling function, thinking of a toast message on error
    DOWNLOADS_ARRAY.set([])
    console.log("error",e)
}