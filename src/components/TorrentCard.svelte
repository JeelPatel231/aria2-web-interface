<div class="download-card body1">
    <!-- HEADER -->
    <div class="title headline1 span-entire-row">Big.Buck.Bunny.mp4</div>

    <!-- DOWNLOAD SIZE -->
    <span class="material-icons">download_for_offline</span>
    <span class="size">13 MB / 126 MB</span>
    
    <!-- PROGRESS BAR -->
    <div class="download-bar span-entire-row">
        <div class="progress-bar"></div>
    </div>

    <!-- FOOTER -->
    <span class="material-icons">north</span> 5.7 Mbps
    <span class="material-icons">south</span> 1.4 Mbps
    <span class="material-icons">north</span> seeders : 14
    <span class="material-icons">south</span> peers : 7

</div>

<style>
.download-card{
    min-width: 300px;
    max-width: 500px;
    color: var(--md-sys-color-on-surface);
    background-color: var(--md-sys-color-surface-variant);

    padding: 16px;
    margin: 16px 0 0 16px;
    border-radius: 16px;
    flex-grow: 1;
    display: grid;
    grid-template-rows: 1fr 1fr min-content min-content;
    grid-template-columns: 20px 1fr 20px 1fr;
}
.span-entire-row{
    grid-column: 1 / -1;
}
.title{
    text-overflow: ellipsis;
    overflow: hidden;
}
span{
    align-self: center;
}
.size{
    grid-column: 2 / -1;
}
/* PROGRESS BAR */
.download-bar{
    width: 100%;
    background-color: var(--md-sys-color-outline);
    height: 4px;
    border-radius: 2px;
    overflow: hidden;
    margin: 8px 0;
}
.progress-bar{
    height: 100%;
    background-color: var(--md-sys-color-on-primary-container);
    width: 12%;
}
</style>


<script>
// WEBSOCKET POLLING DATA WILL BE PASSED TO COMPONENT PER POLL
</script>