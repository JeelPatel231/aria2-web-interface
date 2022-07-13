import { WS } from "./store"

const handleUpdates = (e) => {
    // template for handling updates
    console.log(e)
    WS.tellActive()
}

export const mapOfMethodFunctions = {
    // everything is set to console log for now
    "aria2.onDownloadStart": handleUpdates,
    "aria2.onDownloadComplete": handleUpdates,
    "aria2.onDownloadError": handleUpdates,
    "aria2.onDownloadPause": handleUpdates,
    "aria2.onDownloadStop": handleUpdates,
}