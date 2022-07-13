<div class="toast-container">
    <!-- text needs to be unique since its a key -->
    {#each $TOAST_QUEUE as err (err.desc)}
    <div class="toast" transition:fly|local={{ x: 200 }} animate:flip >
        <div class="headline4">
            {err.head}
        </div>
        <div class="body1">
            {err.desc}
        </div>
    </div>
    {/each}
</div>

<style>
.toast-container{
    position: fixed;
    width: 100%;
    height: 100%;
    max-width: 500px;
    right: 0;
    top: 0;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
}
.toast{
    background-color: var(--md-sys-color-secondary-container);
    color: var(--md-sys-color-on-secondary-container);
    border-radius: 16px;
    padding: 16px;
    margin-top: 16px;
    margin-right: 16px;
}
</style>

<script lang="ts">
import { fly } from 'svelte/transition';
import { flip } from 'svelte/animate';
import { TOAST_QUEUE } from '../store/store'

let count = 0;

function showNotification(err){
    $TOAST_QUEUE = [ ...($TOAST_QUEUE) , err ] // assign this way for reactivity
    
    // remove element from the queue after 5000ms
    setTimeout(()=>{
        $TOAST_QUEUE.shift();
        $TOAST_QUEUE = $TOAST_QUEUE // assign for reactivity
    }, 5000 )
    
}
</script>