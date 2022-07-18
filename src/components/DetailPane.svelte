<div>
    <button class="material-icons" on:click={()=>{$CURRENT_DETAIL = null}}>close</button>
    <br>
    <pre class="body2">
        {JSON.stringify($CURRENT_DETAIL, null, 4)}
    </pre>
</div>

<script>
import { CURRENT_DETAIL } from "../store/store";
</script>