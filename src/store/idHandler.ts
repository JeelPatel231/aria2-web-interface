import { DOWNLOADS_ARRAY } from "./store"

export const mapOfIdFunctions = {
    // everything is set to console log for now
    "adduri" : console.log,
    "addtorrent" : console.log,
    "tellactive" : (e) => {if (e.error == undefined ) DOWNLOADS_ARRAY.set(e.result)},
    "tellwaiting" : (e) => {if (e.error == undefined ) DOWNLOADS_ARRAY.set(e.result)},
    "tellstopped" : (e) => {if (e.error == undefined ) DOWNLOADS_ARRAY.set(e.result)},
    "pause": console.log,
    "unpause": console.log,
    "remove": console.log,
}
