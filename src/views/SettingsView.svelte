<div class="settings-container headline1">
    <div class="header">
        SETTINGS
    </div>
    <div class="settings-body body1">
        <M3input icon="public" label="JsonRPC URL" bind:value={RPC_INPUT_URL} func={()=>{WS_RPC_URL.set(RPC_INPUT_URL)}}/>
        <M3input icon="password" label="JsonRPC Secret" bind:value={RPC_INPUT_SECRET} func={()=>{WS_RPC_SECRET.set(RPC_INPUT_SECRET)}}/>
    </div>
</div>

<style>
.settings-container{
    padding: 16px 0 0 16px;
    color: var(--md-sys-color-on-surface);
}
.header{
    padding: 18px 0 18px 42px;
}
</style>

<script lang="ts">
import M3input from "../components/M3input.svelte"; // component import
import { WS_RPC_URL, WS_RPC_SECRET } from "../store/store"; // store imports


let RPC_INPUT_URL = "ws://localhost:6800/jsonrpc" // default value of WS URL
let RPC_INPUT_SECRET = "" // default value of RPC SECRET

</script>