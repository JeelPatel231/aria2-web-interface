{#if $CURRENT_DETAIL}
{@const obj = $CURRENT_DETAIL}
<div class="details">
    <button class="material-icons btn" on:click={()=>{$CURRENT_DETAIL = null}}>close</button>
    <div class="headline1">
        <b>{getCardTitle(obj)}</b>
    </div>
    <div class="headline4">
        <b>GID :</b> {obj.gid}
    </div>

    <div class="body1"><b>Connections: </b> {obj.connections}</div>
    <div class="body1"><b>Dir: </b> {obj.dir}</div>
    <div class="body1"><b>Download speed : </b> {formatBytes(obj.downloadSpeed)}/s</div>
    <div class="body1"><b>Info Hash: </b> {obj.infoHash}</div>
    <div class="body1"><b>Number of Pieces: </b> {obj.numPieces}</div>
    <div class="body1"><b>Number of seeders: </b> {obj.numSeeders}</div>
    <div class="body1"><b>Piece Length: </b> {formatBytes(obj.pieceLength)}</div>
    <div class="body1"><b>Seeder: </b> {obj.seeder}</div>
    <div class="body1"><b>Status: </b> {obj.status}</div>
    <div class="body1"><b>Total Length: </b> {formatBytes(obj.totalLength)}</div>
    <div class="body1"><b>Upload Length: </b> {formatBytes(obj.uploadLength)}</div>
    <div class="body1"><b>Upload Speed: </b> {formatBytes(obj.uploadSpeed)}/s</div>

    <div class="body1"><b>Files :</b></div>
    <div class="body2 padded-h">
        {#each obj.files as fl}
            <div>{fl.path}</div>
        {/each}
    </div>    

    {#if obj.bittorrent}
    <div class="body1"><b>Announce List :</b></div>
    <div class="body2 padded-h">
        {#each obj.bittorrent.announceList as list}
            <div>{list}</div>
        {/each}
    </div>
    {/if}

    <div class="body1"><b>Pieces Bitmap</b></div>
    <div class="pieces-container">
        {#each hex2bin(obj.bitfield, parseInt(obj.numPieces)).split('') as i}
            <span class="piece" class:filled={i == "1"} />
        {/each}
    </div>
</div>
{/if}

<style>
.btn{
    background: none;
    outline: none;
    border: none;
    color: var(--md-sys-color-on-surface-variant);
    float: right;
    cursor: pointer;
    font-size: 32px;
}
.pieces-container{
    display: flex;
    flex-wrap: wrap;
}
.piece{
    background-color: #8884;
    border-radius: 2px;
    height: 12px;
    width: 12px;
    margin: 1px;
}
.piece.filled{
    background-color: var(--md-sys-color-primary);
}
.details > * {
    margin-top: 8px;
}
.body1{
    /* border-bottom: 1px solid var(--md-sys-color-outline); */
}
</style>

<script>
import { CURRENT_DETAIL, getCardTitle, formatBytes } from "../store/store";

// https://stackoverflow.com/a/68315766
const hex2bin = (data,num) => data.split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('').slice(0,num);

if($CURRENT_DETAIL) console.log($CURRENT_DETAIL)
</script>