<div class="add-download-wrapper">
    <div class="headline1 padded-h padded-v">
        Add Download
    </div>

    <div class="subhead1 padded-h padded-v">LINKS</div>
    <M3TextArea icon="public" placeholder="Magnet URI or Direct Link" bind:value={textareaInput}/>
    <div class="caption padded-h padded-v">*Multiple links can be added using newline</div>

    <label class="custom-input body1 padded-h padded-v">
        Select torrents
        <input type="file" bind:this={inputEl} name="files[]" accept=".torrent" multiple />
    </label>
    <span class="overline">
        {fileArray ? fileArray.length + " selected" : ''}
    </span>
    <div class="padded-h">
        {#each fileArray??[] as files}
            <div class="body1 torrent-file-list">{files.name}</div>
        {/each}
    </div>

    <div class="subhead1 padded-h padded-v">HEADERS</div>
    <M3TextArea icon="checklist" rows={1} placeholder="Header-Key: Header-Value" expandable={true} bind:value={headersInput}/>
    <div class="caption padded-h padded-v">*User-Agent can be changed by setting User-Agent header above</div>

    <button on:click={handleLinks} class="add body1 padded-v padded-h">ADD</button>
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
.torrent-file-list{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
}
label.custom-input > input[type="file"]{
    display: none;
}
label.custom-input {
    padding: 8px 16px;
    background: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary);
    outline: none;
    border: none;
    border-radius: 100px;
    font-weight: bold;
    margin-right: 12px;
    display: inline-block;
}
</style>

<script lang="ts">
import { WS } from "../store/store";
import M3TextArea from "./M3TextArea.svelte";
import { activeTab } from "../store/store";
import { onMount } from "svelte";

let textareaInput:string = "";
let headersInput:string = "";

const handleLinks = () => {
    // split new lines and remove empty elements and run a forEach loop
    // convert to set to remove duplicate entries
    new Set(textareaInput.split('\n').filter(x => x)).forEach((value)=>{
        WS.wsreq("adduri","aria2.addUri",[ [value] , {"header":headersInput.split('\n')} ])
    })

    if(inputEl.files.length) readInput()

    $activeTab = "play_arrow"; // switch to active downloads tab after adding
}

let inputEl: HTMLInputElement;
let fileArray: FileList;
onMount(()=>{
    inputEl.onchange = () => {
        fileArray = inputEl.files
    }
})

// promise function wrapper to read synchronously
function readFile(file){
    return new Promise((resolve, reject) => {
        var fr = new FileReader();
        fr.onload = () => {
            console.log((<string>fr.result).split(',')[0])
            resolve((<string>fr.result).split(',')[1])
        };
        fr.onerror = reject;
        fr.readAsDataURL(file);
    });
}

async function readInput() {
    let fileArr = inputEl.files
    for(let i:number=0; i < fileArr.length ; i++){
        let k = await readFile(fileArr[i])
        WS.wsreq("addtorrent","aria2.addTorrent", [ k ] )
    }
}
</script>