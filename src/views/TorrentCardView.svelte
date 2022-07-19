<div class="torrent-card-container" class:pane-visible={paneVisible}>
    <div class="download-cards">
        {#each $DOWNLOADS_ARRAY as entry }
            <TorrentCard data={entry}/>
        {/each}
    </div>
    <div class="download-info">
        <DetailPane/>
    </div>
</div>

<style>
.torrent-card-container{
    display: grid;
    height: 100vh;
}
.download-cards{
    display: flex;
    height: max-content;
    flex-wrap: wrap;
    justify-content: center;

    padding: 16px;

    /* NESTED SCROLLING */
    overflow-y: auto;
}
.download-info{
    padding: 16px;
    overflow-y: auto;
    color: var(--md-sys-color-on-background);
    background-color: var(--md-sys-color-background);
    border-left: 2px solid var(--md-sys-color-surface-variant);
    display: none;
}

.pane-visible{
                /* "x x", because doesnt matter, it will be overriden @ 926px */
    grid-template: "x x" / minmax(332px,500px) minmax(500px,auto);
}

.pane-visible .download-info {
    display: block;
}

@media only screen and (max-width:926px){
    .torrent-card-container{
        grid-template:"one";
        height:min-content;
    }
    .download-cards, .download-info{
        grid-area: one;
    }
    .download-info{
        display: none;
    }
}
</style>

<script lang="ts">
import DetailPane from "../components/DetailPane.svelte";
import TorrentCard from "../components/TorrentCard.svelte";
import { DOWNLOADS_ARRAY, CURRENT_DETAIL } from "../store/store";

let paneVisible:boolean = false;

CURRENT_DETAIL.subscribe((val)=>{
    paneVisible = !!val
})
</script>