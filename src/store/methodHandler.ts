import { showNotification, updateCurrentTabArray } from "./store"

const handleUpdates = (e) => {
    // template for handling updates
    let error:boolean = ["aria2.onDownloadError"].includes(e.method)
    updateCurrentTabArray()
    showNotification({head:e.method,desc:e.params,error:error})
}

export const mapOfMethodFunctions = {
    // everything is set to console log for now
    "aria2.onDownloadStart": handleUpdates,
    "aria2.onDownloadComplete": handleUpdates,
    "aria2.onDownloadError": handleUpdates,
    "aria2.onDownloadPause": handleUpdates,
    "aria2.onDownloadStop": handleUpdates,
}