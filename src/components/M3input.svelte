<div class="flex-parent body1">
    {#if icon}
        <span class="material-icons label-icon">{icon}</span>
    {/if}
    <span class="input-label-wrapper">
        <input spellcheck="false" type="text" bind:this={inputField} required class="body1" class:merged={merged} bind:value={value}>
        <span class="input-label">{label}</span>
    </span>
    {#if func}
        <button class="material-icons submitbtn" class:merged={merged} on:click={func}>{btnicon}</button>
    {/if}
</div>

<style>
.flex-parent{
    --corner-radius : 8px;
}

.label-icon{
    vertical-align: middle;
    font-size: 24px;
    padding: 8px 12px 8px 4px;
}
.flex-parent{
    display: flex;
    margin: 24px 0;
    color:var(--md-sys-color-on-background);
}
.input-label-wrapper{
    width: 80%;
    max-width: 500px;
    position: relative;
}
.input-label-wrapper input{
    background: none;
    border: 2px solid var(--md-sys-color-surface-variant);
    color:var(--md-sys-color-on-surface);
    padding: 8px;
    border-radius: var(--corner-radius);
    width: 100%;
    /* no highlights on focus */
    outline: none;
}
.input-label-wrapper > .input-label{
    position: absolute;
    left: 10px;
    width: fit-content;
    background: var(--md-sys-color-background);
    color: var(--md-sys-color-outline);
    font-size: 18px;
    padding: 0 4px;
    /* bottom when unfilled/unfocused */
    top: 16px;
    line-height: 10px;
    transition: 200ms ease;
    pointer-events: none;
}
.input-label-wrapper input:focus{
    border: 2px solid var(--md-sys-color-on-surface);
}

.input-label-wrapper input:valid ~ .input-label, .input-label-wrapper input:focus ~ .input-label{
    color: var(--md-sys-color-on-background);
    line-height: 4px;
    font-size: 10px;
    /* compensate for focused text-box highlighted border */
    top: -2px;
}

.submitbtn{
    vertical-align: middle;
    color: var(--md-sys-color-on-primary);
    border: none;
    font-size: 24px;
    padding: 10px;
    background: var(--md-sys-color-primary);
    border-radius: 16px;
    margin: 0 16px;
}

/* IF INPUT AND BUTTON ARE MERGED */
.input-label-wrapper > input.merged{
    border-right: none;
    border-radius: var(--corner-radius) 0 0 var(--corner-radius);
}
.submitbtn.merged{
    border-left: none;
    border-radius: 0 var(--corner-radius) var(--corner-radius) 0;
    margin: 0;
}
</style>

<script lang="ts">
import { onMount } from "svelte";


export let value:string = "";
export let func = null;
export let icon:string = "";
export let label:string = "";
export let merged:boolean = false ;
export let btnicon:string = "done";


let inputField:HTMLElement;

onMount(()=>{
    // execute the passed function on pressing enter
    inputField.onkeyup = (e) => {
        if (e.key === "Enter" && func) func()
    }
})
</script>