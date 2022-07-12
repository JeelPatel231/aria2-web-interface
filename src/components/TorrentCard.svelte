<div class="download-card body1" on:click={()=>{console.log(data.gid);WS.wsreq('pause','aria2.pause',[data.gid])}}>
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
    <span class="material-icons">north</span> <span>{formatBytes(data.uploadSpeed)}/s</span>
    <span class="material-icons">south</span> <span>{formatBytes(data.downloadSpeed)}/s</span>
    <span class="material-icons">north</span> <span>seeders : {data.numSeeders}</span>
    <span class="material-icons">south</span> <span>peers : {data.connections}</span>

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
    grid-template-rows: min-content min-content min-content min-content;
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