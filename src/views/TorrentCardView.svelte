<div class="torrent-card-container">
    {#each $DOWNLOADS_ARRAY as entry }
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

<script lang="ts">
import TorrentCard from "../components/TorrentCard.svelte";
import { DOWNLOADS_ARRAY } from "../store/store";
</script>