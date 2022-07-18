{#if $CURRENT_DETAIL}
{@const obj = $CURRENT_DETAIL}
<div class="details">
    <button class="material-icons btn" on:click={()=>{$CURRENT_DETAIL = null}}>close</button>
    <div class="headline1">
        {getCardTitle(obj)}
    </div>
    <div class="headline4">
        GID : {obj.gid}
    </div>

    <div class="body1">Connections : {obj.connections}</div>
    <div class="body1">Dir : {obj.dir}</div>
    <div class="body1">Download speed : {formatBytes(obj.downloadSpeed)}/s</div>
    <div class="body1">Info Hash : {obj.infoHash}</div>
    <div class="body1">Number of Pieces : {obj.numPieces}</div>
    <div class="body1">Number of seeders : {obj.numSeeders}</div>
    <div class="body1">Piece Length : {formatBytes(obj.pieceLength)}</div>
    <div class="body1">seeder : {obj.seeder}</div>
    <div class="body1">Status : {obj.status}</div>
    <div class="body1">Total Length : {formatBytes(obj.totalLength)}</div>
    <div class="body1">Upload Length : {formatBytes(obj.uploadLength)}</div>
    <div class="body1">Upload Speed : {formatBytes(obj.uploadSpeed)}/s</div>

    <div class="body1">Files: </div>
    <div class="body2 padded-h">
        {#each obj.files as fl}
            <div>{fl.path}</div>
        {/each}
    </div>    

    {#if obj.bittorrent}
    <div class="body1">Announce List</div>
    <div class="body2 padded-h">
        {#each obj.bittorrent.announceList as list}
            <div>{list}</div>
        {/each}
    </div>
    {/if}

    <div class="body1">Pieces Bitmap</div>
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
    background-color: #fff;
    height: 12px;
    width: 12px;
    border: 1px solid var(--md-sys-color-surface-variant);
}
.piece.filled{
    background-color: var(--md-sys-color-primary);
}
.details > * {
    margin-top: 8px;
}
.body1{
    border-bottom: 1px solid var(--md-sys-color-outline);
}
</style>

<script>
import { CURRENT_DETAIL, getCardTitle, formatBytes } from "../store/store";

// https://stackoverflow.com/a/68315766
const hex2bin = (data,num) => data.split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('').slice(0,num);

</script>