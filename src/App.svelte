<!-- MAIN PAGE - COMPONENT TREE -->
<div class="main-page">
    <Siderail on:tabClicked={changeComponent}/>
    <svelte:component this={ComponentDict[chosenComponentKey]}/>
</div>

<style>
.main-page{
    /* padding left for sidebar */
    padding: 0 0 0 92px;
}
@media only screen and (max-width : 600px){
    .main-page{
        /* padding bottom for mobile devices */
        padding: 0 0 88px 0;
    }
}
</style>

<script lang="ts">
import './assets/global.css'      // GLOBAL CSS STYLES
import './assets/m3colors.css'    // MATERIAL3 UI COLOR PALLETE

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