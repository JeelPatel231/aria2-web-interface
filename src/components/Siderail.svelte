<!-- SIDERAIL CONTAINER -->
<div class="siderail headline4">
    <!-- Container for adding more primary buttons in future, eg : hamburger -->
    <div class="big-button-container">
        <!-- PRIMARY FLOATING ACTION BUTTON -->
        <button on:click={()=>handleTabChange("add_download")} class="rail-item-big primary material-icons">add</button>
    </div>

    <!-- NAVIGATION RAIL ITEMS -->
    <div class="nested-vertical-flex">
        {#each Object.entries(tabArray) as [tab,label]}
        <div class="rail-item-wrapper" on:click={()=>handleTabChange(tab)}>
            <button class:active={activeTab == tab} class="rail-item material-icons">{tab}</button>
            <div class="icon-label body2">{label}</div>
        </div>
        {/each}
    </div>
    
</div> <!-- /siderail -->

<style>
.siderail{
    height: 100vh;
    padding: 0 8px;
    width: 92px;
    position: fixed;
    left: 0;
    background-color: var(--md-sys-color-surface);
    border-right: 2px solid var(--md-sys-color-outline);
    display: flex;
    flex-direction: column;
    text-align: center;
}
.rail-item-wrapper{
    cursor: pointer;
    padding-bottom: 8px;
}
.rail-item{
    width: 72px;
}
.icon-label{
    text-transform: capitalize;
    color: var(--md-sys-color-on-secondary-container);
}
.siderail button{
    color: var(--md-sys-color-on-surface);
    background: none;
    outline: none;
    cursor: pointer;
    border: none;
    text-align: center;
    margin: 8px 0;
    padding:4px 8px;
    border-radius: 100px;
}
.siderail button.active{
    color: var(--md-sys-color-on-secondary-container);
    background-color: var(--md-sys-color-secondary-container);
}
.big-button-container{
    margin: 48px 0;
}
button.rail-item-big{
    color: var(--md-sys-color-on-surface);
    font-size: 32px;
    padding:20px;
    border-radius: 24px;
}
button.rail-item-big.primary{
    background-color: var(--md-sys-color-primary-container);
}
.nested-vertical-flex{
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media only screen and (max-width : 600px){
    .siderail{
        bottom: 0;
        padding: 0 0 0 8px;
        flex-direction: row-reverse;
        width: 100%;
        height: min-content;
        border: none;
    }
    .big-button-container{
        margin: 0 8px;
    }
    .nested-vertical-flex{
        flex-direction: row;
        margin-right: auto;
    }
    .rail-item{
        height: min-content;
        align-self: center;
    }
}
</style>

<script lang="ts">
import { DOWNLOADS_ARRAY } from '../store/store';

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

//  all the tabs with material icon and name go here
const tabArray = {
    "play_arrow" : "Active",
    "pause" : "Paused",
    "stop" : "Stopped",
    "settings" : "Settings",
} 

let activeTab: string = "play_arrow" // default is active downloads

const handleTabChange = (tabName) => {
    DOWNLOADS_ARRAY.set([]) // empty the display array on tab change
    activeTab = tabName;
    dispatch("tabClicked", tabName);
}
</script>
