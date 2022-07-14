<div class="toast-container">
    <!-- text needs to be unique since its a key -->
    {#each $TOAST_QUEUE as err (err.desc)}
    <div class="toast" class:error={err.error} transition:fly|local={{ x: 200 }} animate:flip={{ duration: 200 }} >
        <div class="body1">
            {err.head}
        </div>
        {#each err.desc as txt}
        <div class="caption">
            {txt.gid}
        </div>
        {/each}
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
    /* click through */
    pointer-events: none;
}
.toast{
    background-color: var(--md-sys-color-secondary-container);
    color: var(--md-sys-color-on-secondary-container);
    border-radius: 16px;
    padding: 16px;
    margin-top: 16px;
    margin-right: 16px;
    border: 2px solid var(--md-sys-color-outline);
}
.error{
    background-color: var(--md-sys-color-error);
    color: var(--md-sys-color-on-error);
    border: none;
}
</style>

<script lang="ts">
import { fly } from 'svelte/transition';
import { flip } from 'svelte/animate';
import { TOAST_QUEUE } from '../store/store'

</script>