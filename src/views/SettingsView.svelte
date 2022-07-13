<div class="settings-container">
    <!-- HEADER -->
    <div class="padded-h padded-v display3">
        SETTINGS
    </div>

    <!-- START TOKENS -->
    <div class="padded-h subhead1">
        TOKENS
    </div>
    <!-- this has a set buttons so it doesnt make new websocket objects on every character change -->
    <M3input icon="public" label="JsonRPC URL" bind:value={RPC_INPUT_URL} func={()=>{WS_RPC_URL.set(RPC_INPUT_URL)}}/>
    <M3input icon="password" label="JsonRPC Secret" bind:value={$WS_RPC_SECRET} />
    
    <!-- START DISPLAY  -->
    <div class="padded-h subhead1">
        DISPLAY
    </div>
    <M3Checkbox icon="dark_mode" label="Dark Theme" bind:checked={$isDarkTheme} />
</div>

<style>
.settings-container{
    padding: 16px 0 0 16px;
    color: var(--md-sys-color-on-surface);
}
.subhead1{
    font-weight: bold;
    color: var(--md-sys-color-primary);
}
</style>

<script lang="ts">
//component imports
import M3input from "../components/M3input.svelte"; 
import M3Checkbox from "../components/M3Checkbox.svelte"; 

import { WS_RPC_URL, WS_RPC_SECRET, isDarkTheme } from "../store/store"; // store imports


let RPC_INPUT_URL = "ws://localhost:6800/jsonrpc" // default value of WS URL

</script>