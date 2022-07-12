<div class="torrent-card-container">
    {#each $ACTIVE_DOWNLOADS as entry }
        <TorrentCard data={entry}/>
    {/each}
</div>

<style>
.torrent-card-container{
    display: flex;
    flex-wrap: wrap;
    padding: 0 16px 16px 0 ;
    justify-content: center;

    /* NESTED SCROLLING */
    overflow-y: auto;
}
</style>

<script>
import TorrentCard from "../components/TorrentCard.svelte";
import { ACTIVE_DOWNLOADS } from "../store/store";
</script>