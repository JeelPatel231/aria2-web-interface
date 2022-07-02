<!-- SIDERAIL CONTAINER -->
<div class="siderail headline4">
    <!-- Container for adding more primary buttons in future, eg : hamburger -->
    <div class="big-button-container">
        <!-- PRIMARY FLOATING ACTION BUTTON -->
        <button class="rail-item-big primary material-icons">add</button>
    </div>

    <!-- NAVIGATION RAIL ITEMS -->
    <div class="nested-vertical-flex">
        <button class:active={activeTab == "home"} class="rail-item material-icons" on:click={()=>handleTabChange("home")} >home</button>
        <button class:active={activeTab == "search"} class="rail-item material-icons" on:click={()=>handleTabChange("search")} >search</button>
    </div>
    
</div> <!-- /siderail -->

<style>
.siderail{
    height: 100vh;
    padding: 0 8px;
    width: 90px;
    /* position: fixed; */
    background-color: var(--md-sys-color-surface);
    border-right: 2px solid var(--md-sys-color-outline);
    transition: 200ms ease;
    display: flex;
    flex-direction: column;
    text-align: center;
}
.siderail button{
    color: var(--md-sys-color-on-surface);
    background: none;
    outline: none;
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
}

</style>

<script lang="ts">
let activeTab: string;
const handleTabChange = (tabName) => {
    activeTab = tabName;
    // OTHER CODE TO BE PUT FOR HANDLING TAB CHANGES
}
</script>