<!-- MAIN PAGE - COMPONENT TREE -->
<div class="main-page">
    <Siderail on:tabClicked={changeComponent}/>
    <svelte:component this={ComponentDict[chosenComponentKey]}/>
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

// all the components respective to the tabs go here
const ComponentDict = {
    "home" : TorrentCardView,
}

let chosenComponentKey = "home"; // default is home

const changeComponent = (e) => {
    chosenComponentKey = e.detail;
}

</script>