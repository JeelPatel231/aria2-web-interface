import { DOWNLOADS_ARRAY } from "./store"

export const mapOfIdFunctions = {
    // everything is set to console log for now
    "adduri" : console.log,
    "addtorrent" : console.log,
    "tellactive" : (e) => DOWNLOADS_ARRAY.set(e.result),
    "tellwaiting" : (e) => DOWNLOADS_ARRAY.set(e.result),
    "tellstopped" : (e) => DOWNLOADS_ARRAY.set(e.result),
    "pause": console.log,
}
