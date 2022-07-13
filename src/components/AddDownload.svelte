<div class="add-download-wrapper">
    <div class="headline1 padded-h padded-v">
        Add Download
    </div>

    <div class="subhead1 padded-h padded-v">LINKS</div>
    <M3TextArea icon="public" placeholder="Magnet URI or Direct Link" bind:value={textareaInput}/>
    <div class="caption padded-h padded-v">*Multiple links can be added using newline</div>

    <div class="subhead1 padded-h padded-v">HEADERS</div>
    <M3TextArea icon="checklist" rows={1} placeholder="'Header-Key' : 'Header-Value'" expandable={true} bind:value={headersInput}/>
    <div class="caption padded-h padded-v">*User-Agent can be changed by setting User-Agent header above</div>

    <button on:click={handleLinks} class="add padded-v padded-h">ADD</button>
</div>

<style>
.add-download-wrapper{
    color: var(--md-sys-color-on-background);
    padding:16px 32px 0 16px;
}
.add{
    padding: 8px 16px;
    background: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary);
    outline: none;
    border: none;
    border-radius: 100px;
    font-weight: bold;
}
.subhead1{
    font-weight: bold;
    color: var(--md-sys-color-primary);
}
</style>

<script lang="ts">
import { WS } from "../store/store";
import M3TextArea from "./M3TextArea.svelte";
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

let textareaInput:string = "";
let headersInput:string = "";

const handleLinks = () => {
    // split new lines and remove empty elements and run a forEach loop
    // convert to set to remove duplicate entries
    new Set(textareaInput.split('\n').filter(x => x)).forEach((value)=>{
        WS.wsreq("adduri","aria2.addUri",[ [value] , {"header":headersInput.split('\n')} ])
    })

    dispatch("downloadAdded", "play_arrow"); // switch to active downloads tab after adding
}
</script>