<div class="download-card">
    <!-- HEADER -->
    <div class="headline1">Big.Buck.Bunny.mp4</div>
    <div class="size headline5">126 MB</div>
    <!-- BODY -->
    <div class="content">
        <div class="download-bar">
            <div class="progress-bar"></div>
        </div>
    </div>
    <!-- FOOTER -->
    <div class="footer">
        <div class="flex-center body1">
            <span class="material-icons">north</span> 5.7 Mbps
            <span class="material-icons">south</span> 1.4 Mbps
        </div>
        <div class="body1">
            <div class="text">seeders : 14</div>
            <div class="text">peers : 7</div>
        </div>
    </div>

</div>

<style>
.download-card{
    height: 300px;
    min-width: 300px;
    max-width: 500px;
    color: var(--md-sys-color-on-surface);
    background-color: var(--md-sys-color-surface-variant);
    /* border: 2px solid var(--md-sys-color-outline); */

    padding: 16px;
    margin: 16px 0 0 16px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.footer{
    margin-top: auto;
}
.footer .flex-center{
    display: flex;
    align-items: center;
}
.footer .text{
    padding-right:8px;
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
    background-color: var(--md-sys-color-primary);
    width: 12%;
}
</style>


<script>
// WEBSOCKET POLLING DATA WILL BE PASSED TO COMPONENT PER POLL
</script>