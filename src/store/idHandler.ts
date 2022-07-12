import { ACTIVE_DOWNLOADS } from "./store"

export const mapOfIdFunctions = {
    // everything is set to console log for now
    "adduri" : console.log,
    "addtorrent" : console.log,
    "tellactive" : (e) => ACTIVE_DOWNLOADS.set(e.result),
    "tellwaiting" : console.log,
    "tellstopped" : console.log,
    "pause": console.log,
}
