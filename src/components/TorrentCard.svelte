<div class="download-card body1">
    <!-- HEADER -->

    <div class="title headline3 span-entire-row">
        {data.bittorrent ? (data.bittorrent.info ? data.bittorrent.info.name : data.files[0].path.split('/').reverse()[0]) :  data.files[0].path.split('/').reverse()[0]}
    </div>

    <!-- DOWNLOAD SIZE -->
    <span class="material-icons size-padding">download_for_offline</span>
    <span class="size size-padding">{formatBytes(data.completedLength)} / {formatBytes(data.totalLength)}</span>
    
    <!-- PROGRESS BAR -->
    <div class="download-bar span-entire-row">
        <div class="progress-bar" style="width:{parseFloat(data.completedLength)/parseFloat(data.totalLength)*100}%"></div>
    </div>

    <!-- FOOTER -->
    {#if data.status == "active"}
        <span class="material-icons">north</span> <span>{formatBytes(data.uploadSpeed)}/s</span>
        <span class="material-icons">south</span> <span>{formatBytes(data.downloadSpeed)}/s</span>
        <span class="material-icons">north</span> <span>seeders : {data.numSeeders}</span>
        <span class="material-icons">south</span> <span>peers : {data.connections}</span>
    {/if}

    <div class="work-btn-container span-entire-row">
        {#if data.status == "active"}
            <span class="work-btns" on:click={()=>{WS.pauseDownload(data.gid)}}> <span class="material-icons">pause</span> Pause</span>
            <span class="work-btns"  on:click={()=>{WS.removeDownload(data.gid)}}><span class="material-icons">stop</span> Stop</span>
        {:else if data.status == "paused" }
            <span class="work-btns" on:click={()=>{WS.unpauseDownload(data.gid)}}> <span class="material-icons">play_arrow</span> Resume</span>
            <span class="work-btns"  on:click={()=>{WS.removeDownload(data.gid)}}><span class="material-icons">close</span>Remove</span>
        {:else if data.status == "complete"}
            <span class="overline">completed</span>
        {:else if data.status == "removed"}
            <span class="overline">Stopped</span>
        {/if}
    </div>
</div>

<style>
.download-card{
    min-width: 300px;
    max-width: 500px;
    color: var(--md-sys-color-on-surface);
    background-color: var(--md-sys-color-surface-variant);

    padding: 16px;
    margin: 16px 0 0 16px;
    border-radius: 16px;
    flex-grow: 1;
    display: grid;
    grid-template-rows: min-content;
    grid-template-columns: 20px 1fr 20px 1fr;
}
.span-entire-row{
    grid-column: 1 / -1;
}
.title{
    text-overflow: ellipsis;
    overflow: hidden;
}
span{
    align-self: center;
    padding-top: 4px;
}
.size{
    grid-column: 2 / -1;
}
.size-padding{
    padding: 8px 0;
}
/* PROGRESS BAR */
.download-bar{
    width: 100%;
    background-color: var(--md-sys-color-outline);
    height: 4px;
    border-radius: 2px;
    overflow: hidden;
    margin: 8px 0;
}
.progress-bar{
    height: 100%;
    background-color: var(--md-sys-color-on-primary-container);
    width: 0%;
}

/* buttons */
.work-btn-container{
    display: flex;
    margin-top: 8px;
}
.work-btns{
    padding: 4px 16px;
    margin: 4px;
    background-color: rgb(0 0 0 / 20%);
    border-radius: 20px;
    cursor: pointer;

    display: flex;
    justify-content: center;
}
.work-btns span.material-icons {
    padding-top: 0;
    margin-right: 4px;
}
</style>


<script lang="ts">
import type { DownloadDataEntry } from '../interfaces/downloadEntry';
import { WS } from "../store/store"

export let data: DownloadDataEntry;

// https://stackoverflow.com/a/18650828
function formatBytes(num: string, decimals:number = 2) : string {
    let bytes:number =  parseInt(num)

    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

</script>