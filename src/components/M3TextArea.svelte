<div class="m3-textarea">
    <span class="material-icons">{icon}</span>
    <textarea bind:this={tx} rows={rows} class="body1" spellcheck="false" bind:value={value} placeholder={placeholder}></textarea>
</div>

<style>
.m3-textarea{
    position: relative;
    display: flex;
    font-size: 24px;
}
span{
    padding: 8px 12px 8px 4px;
}
textarea{
    background: none;
    border: 1px solid var(--md-sys-color-on-background);
    outline: none;
    resize: none;
    color: var(--md-sys-color-on-background);
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    word-break: break-all;
}
</style>

<script lang="ts">
import { onMount } from "svelte";


export let value:string = "";
export let icon:string = "";
export let placeholder:string = "";
export let expandable:boolean = false;
export let rows:number = 15;
let tx: HTMLElement;

// https://stackoverflow.com/a/25621277
const textAreaHeightChanger = () => {
    tx.setAttribute("style", "height:" + (tx.scrollHeight) + "px;overflow-y:hidden;");
    tx.addEventListener("input", () => {
        tx.style.height = "auto";
        tx.style.height = (tx.scrollHeight) + "px";
    }, false);
}

onMount(()=>{
    if(expandable) textAreaHeightChanger()
})

</script>