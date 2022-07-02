<!-- MAIN PAGE - COMPONENT TREE -->
<div class="main-page">
    <Siderail />
    <svelte:component this={TorrentCardView}/>
</div>

<style>
.main-page{
    display: grid;
    grid-template-columns: min-content 1fr;
    height: 100vh;
}
</style>

<script lang="ts">
import './assets/global.css'      // GLOBAL CSS STYLES
import './assets/m3colors.css'    // MATERIAL3 UI COLOR PALLETE
import './assets/typography.css'  // TYPOGRAPHY CLASSES

// COMPONENTS
import Siderail from "./components/Siderail.svelte";
import TorrentCardView from './views/TorrentCardView.svelte';

</script>