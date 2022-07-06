<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="m3-checkbox">
    <span class="material-icons label-icon">
        {icon}
    </span>
    <div class="caption body1">
        {label}
    </div>
    <span class="checkbox-wrapper">
        <input bind:checked={checked} type="checkbox">
        <div class="toggle" />
    </span>
</label>

<style>
.m3-checkbox {
    display: flex;
    align-items: center;
    max-width: 620px;

    margin-top: 8px;
}
.label-icon{
    vertical-align: middle;
    font-size: 24px;
    padding: 8px 12px 8px 4px;
}
.caption{
    margin-left: 2px;
}

.checkbox-wrapper{
    margin: 0 16px;
    margin-left: auto;
}

input[type=checkbox]{
    display: none;
}
/* toggle CONTAINER basic properties */
.toggle{
    height: 28px;
    width: 52px;
    border: 2px solid var(--md-sys-color-on-background);
    border-radius: 16px;
    position: relative;
}
/* slidable circle */
.toggle::after{
    content: '';
    position: absolute;
    transition: 100ms ease;
    font-size: 18px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    background-color: var(--md-sys-color-outline);
    height: 100%;
    width: 26px;
    border-radius: 16px;
    font-family: "Material Icons";

    left: 0;
    transform: translateX(0);
}
/* slidable circle on checked */
input[type=checkbox]:checked ~ .toggle::after{
    background-color: var(--md-sys-color-primary-container);
    content: "check";

    left: 100%;
    transform: translateX(-100%);
}
/* toggle container on checked */
input[type=checkbox]:checked ~ .toggle{
    background-color: var(--md-sys-color-primary);
    border: 2px solid var(--md-sys-color-primary);
}
</style>

<script>
export let checked = false;
export let icon = "";
export let label = "";
</script>